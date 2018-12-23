package jaxrs;

import com.google.common.io.ByteStreams;
import entities.Aplicacao;
import jdbc.DB;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import repository.AplicacaoRepository;
import repository.JPA;

import javax.inject.Inject;
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
public class Acesso {

    private Logger log = Logger.getLogger(this.getClass().getName());

    @Inject @JPA
    AplicacaoRepository apps;

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
        return Response.created(uri).build();
    }

    @PUT
    @Path("/app/{id}")
    public Response updateApp(Aplicacao app, @PathParam("id") Integer id) {
        apps.update(app);
        return Response.ok().build();
    }

    @DELETE
    @Path("/app/{id}")
    public Response deleteApp(@PathParam("id") Integer id) {
        apps.delete(id);
        return Response.ok().build();
    }
}
