package jaxrs;

import jdbc.DB;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.*;

@Path("/")
public class Index {

    @Inject @RequestScoped
    private DB db;

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
}
