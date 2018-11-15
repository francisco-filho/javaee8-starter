package configuration;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;

public class JPAConfiguration {

    @PersistenceUnit(name = "myDB")
    private EntityManagerFactory entityManagerFactory;

    @Produces
    @RequestScoped
    public EntityManager createEntityManager(){
        return entityManagerFactory.createEntityManager();
    }

    public void disposeEntityManager(@Disposes EntityManager em){
        em.close();
    }
}
