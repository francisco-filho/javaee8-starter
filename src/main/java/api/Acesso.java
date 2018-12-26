package api;

import com.google.common.io.ByteStreams;
import entities.Aplicacao;
import entities.Papel;
import jdbc.CondicaoWhere;
import jdbc.DB;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import repository.acesso.AplicacaoRepository;
import repository.Jpa;
import repository.acesso.PapelRepository;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Path("/acesso")
@Transactional
public class Acesso {

    private Logger log = Logger.getLogger(this.getClass().getName());

    @Inject @Jpa
    AplicacaoRepository apps;
    @Inject
    PapelRepository papeis;
    @Inject
    DB db;

    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response upload(
            @FormDataParam("foto") InputStream fis,
            @FormDataParam("foto") FormDataContentDisposition fcd,
            @FormDataParam("id") Integer id
            //@FormDataParam("file") FormDataBodyPart body FOR MULTIPLE FILES
    ){
        try {
            db.executeUpdate("UPDATE db2acs.appl SET BL_FOTO = ? WHERE cd_appl= ?", ByteStreams.toByteArray(fis), id
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return Response.ok(Boolean.TRUE).build();
    }

    @GET
    @Path("/download/{id}")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response download(@PathParam("id") Integer id){
        Map<String, Object> image = db.first("SELECT bl_foto FROM db2acs.appl WHERE cd_appl = ?", id).get();
        byte[] bytes = (byte[])image.get("bl_foto");
        Response.ResponseBuilder resp = Response.ok(bytes);
        resp.header("Content-Disposition","attachment; filename=\""+ "minha-imagem.jpg" +"\"");
        return resp.build();
    }

    @GET
    @Path("/app/{id}")
    public Response getApp(@PathParam("id") Integer id) {
        return Response.ok(apps.findOne(id)).build();
    }

    @GET
    @Path("/app")
    public Response getAllApps(){
//        CondicaoWhere c = CondicaoWhere.builder()
//                .with("id", 2)
//                .with("nome", "like", "Ac%")
//                .orderBy("id")
//                .build();
//        CondicaoWhere c = CondicaoWhere.builder()
//                .with("cd_appl", 2)
//                .with("tx_dsc_appl", "like", "%ac%")
//                .orderBy("cd_appl")
//                .build();

        List<Aplicacao> qa = apps.findAll();
        return Response.ok(qa).build();
    }

    @POST
    @Path("/app")
    public Response newApp(Aplicacao app) {
        Aplicacao created = apps.add(app);
        URI uri = URI.create("/javaee8/api/acesso/app/" + created.getId());
        return Response.ok(created).build();
    }

    @PUT
    @Path("/app/{id}")
    public Response updateApp(Aplicacao app, @PathParam("id") Integer id) {
        apps.update(app);
        return Response.ok(app).build();
    }

    @DELETE
    @Path("/app/{id}")
    public Response deleteApp(@PathParam("id") Integer id) {
        apps.delete(id);
        return Response.ok().build();
    }

    /**
     * API de papeis
     */
    @GET
    @Path("/app/{id}/papel")
    public Response getPapeis(@PathParam("id") Integer id){
        CondicaoWhere condicao = CondicaoWhere.builder()
                .with("cdApp", id)
                .build();

        List<Papel> p = papeis.query(condicao);
        return Response.ok(p).build();
    }

    @POST
    @Path("/app/{id}/papel")
    public Response postPapel(Papel papel){
        papeis.add(papel);
        papel.setPermissoes(null);
        return Response.ok(papel).build();
    }

    @PUT
    @Path("/app/{id}/papel")
    public Response putPapel(Papel papel, @PathParam("id") Integer id) {
        papeis.update(papel);
        return Response.ok(papel).build();
    }

    @GET
    @Path("/app/teste")
    public Response teste(){
        Aplicacao app = apps.findOne(1);
        app.setNome(app.getNome() + " -> ");
        apps.update(app);

        db.first("select * from db2acs.appl");
        return Response.ok().build();
    }
}
