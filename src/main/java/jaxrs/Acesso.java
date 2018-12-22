package jaxrs;

import repository.AplicacaoRepositoryJdbc;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

@Path("/acesso")
public class Acesso {

    @Inject
    AplicacaoRepositoryJdbc apps;

    @GET
    @Path("/app-{id}")
    public Response getApp(@PathParam("id") Integer id) {
        return Response.ok(apps.findOne(id)).build();
    }
}
