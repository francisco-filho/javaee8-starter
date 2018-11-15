package jaxrs;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collections;
import java.util.Map;
import java.util.Objects;

@Path("/test")
public class Index {

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response index(@PathParam("id") Integer id){
        Objects.requireNonNull(id);
        Map map = Collections.singletonMap("id", id);
        return Response.ok(map).build();
    }
}
