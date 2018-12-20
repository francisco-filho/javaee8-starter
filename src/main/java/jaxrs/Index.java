package jaxrs;

import configuration.Auto;
import entities.Usuario;
import jdbc.DB;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.InputStream;
import java.util.*;
import java.util.logging.Logger;

@Path("/")
public class Index {

    @Inject @RequestScoped
    private DB db;

    @Inject @Auto
    private Usuario ux;

    @Inject
    private Logger log;


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
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response index(@PathParam("id") Integer id){
        Objects.requireNonNull(id);
        Map map = Collections.singletonMap("id", id);
        return Response.ok(map).build();
    }

    @GET
    @Path("/deps")
    public Response deps(){
        List<Map<String, Object>> d = db.list("SELECT * FROM deps");
        return Response.ok(d).build();
    }

    @GET
    @Path("/newusuario")
    public Response createUsuario(){
        return Response.ok(Boolean.TRUE).build();
    }

    @GET
    @Path("/getusuario")
    public Response getUsuario(){
        return Response.ok(ux.getNome()).build();
    }
}
