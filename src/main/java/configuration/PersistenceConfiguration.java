package configuration;

import jdbc.DB;

import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.sql.DataSource;

public class PersistenceConfiguration {

    @PersistenceUnit(name = "myDB")
    private EntityManagerFactory entityManagerFactory;

    @Resource(mappedName="jdbc/portal2")
    private DataSource defaultDS;

    @Produces
    @RequestScoped
    public EntityManager createEntityManager(){
        return entityManagerFactory.createEntityManager();
    }

    public void disposeEntityManager(@Disposes EntityManager em){
        em.close();
    }

    @Produces
    @RequestScoped
    public DB db(){
        return new DB(defaultDS);
    }
}
