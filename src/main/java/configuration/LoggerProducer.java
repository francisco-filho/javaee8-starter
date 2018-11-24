package configuration;

import javax.enterprise.inject.Produces;
import javax.enterprise.inject.spi.InjectionPoint;
import java.util.logging.Logger;

public class LoggerProducer {
    @Produces
    public Logger getLogger(InjectionPoint ip){
        return Logger.getLogger(ip.getBean().getBeanClass().getName());
    }

    @Produces @Auto
    public Logger getAutoLogger(){
        return Logger.getLogger("Startup Logger");
    }
}
