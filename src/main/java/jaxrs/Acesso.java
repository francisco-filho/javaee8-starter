package jaxrs;

import entities.Aplicacao;
import repository.*;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.net.URI;

@Path("/acesso")
public class Acesso {

    @Inject @JPA
    AplicacaoRepository apps;

    @GET
    @Path("/app/{id}")
    public Response getApp(@PathParam("id") Integer id) {
        return Response.ok(apps.findOne(id)).build();
    }

    @GET
    @Path("/app")
    public Response getAllApps(){
       return Response.ok(apps.findAll()).build();
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
