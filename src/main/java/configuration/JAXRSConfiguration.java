package configuration;

import jaxrs.Acesso;
import jaxrs.Index;
import org.glassfish.jersey.media.multipart.MultiPartFeature;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class JAXRSConfiguration extends Application {
    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(MultiPartFeature.class);
        resources.add(Index.class);
        resources.add(Acesso.class);
        return resources;
    }
}
