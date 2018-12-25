package api;

import configuration.Auto;
import entities.Usuario;
import jdbc.DB;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;
import java.util.logging.Logger;

@Path("/")
public class Index {

    private Logger log = Logger.getLogger(this.getClass().getName());

    @Inject @RequestScoped
    private DB db;

    @Inject @Auto
    private Usuario user;

    @Inject
    private HttpSession session;

    @GET
    @Path("/auth")
    public Response auth(){
        return Response.ok(session.getAttribute("usuario")).build();
    }

    public void saveImage(){
        java.nio.file.Path p = Paths.get("c:\\tmp\\foto-nova.jpg");
        try {
            db.executeUpdate("INSERT INTO public.usuario (nome, foto) VALUES (?, ?)",
                    "nome", Files.readAllBytes(p)
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @GET
    @Path("/redirect")
    public Response redirectMe() throws URISyntaxException {
        URI uri = new URI("http://localhost:3000/detalhes/999");
        return Response.temporaryRedirect(uri).build();
    }

    public Map<String, Object> getImage(){
        Map<String, Object> u = db.first("select * from usuario where id = 1").get();
        return u;
    }

    @POST
    @Path("/upload")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response upload(
            @FormDataParam("myfile") InputStream fis,
            @FormDataParam("myfile") FormDataContentDisposition fcd,
            @FormDataParam("descricao") String desc
            ){
        String fileName = fcd.getFileName();
        log.info(desc);
        return Response.ok(Boolean.TRUE).build();
    }

    @GET
    @Path("/download")
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response download(){
        Map<String, Object> image = getImage();
        byte[] bytes = (byte[])image.get("foto");
        Response.ResponseBuilder resp = Response.ok(bytes);
        resp.header("Content-Disposition","attachment; filename=\""+ image.get("nome") +"\"");
        return resp.build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response index(@PathParam("id") Integer id){
        Objects.requireNonNull(id);
        Map map = Collections.singletonMap("id", id);

        saveImage();

        return Response.ok(map).build();
    }

    @GET
    @Path("/deps")
    public Response deps(){
        //List<Map<String, Object>> d = db.list("SELECT * FROM deps");
        return Response.ok().build();
    }

    @GET
    @Path("/newusuario")
    public Response createUsuario(){
        return Response.ok(Boolean.TRUE).build();
    }

    @GET
    @Path("/getusuario")
    public Response getUsuario(){
        return Response.ok(user.getNome()).build();
    }
}
