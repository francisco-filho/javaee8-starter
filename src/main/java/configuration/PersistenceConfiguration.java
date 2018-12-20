package configuration;

import entities.Usuario;
import jdbc.DB;

import javax.annotation.Resource;
import javax.enterprise.context.RequestScoped;
import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Default;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.sql.DataSource;

public class PersistenceConfiguration {

    @PersistenceUnit(name = "myDB")
    private EntityManagerFactory entityManagerFactory;

    @Resource(mappedName="jdbc/portal2")
    private DataSource defaultDS;

    @Inject
    private HttpSession req;

    @Produces
    @RequestScoped
    public EntityManager createEntityManager(){
        return entityManagerFactory.createEntityManager();
    }

    public void disposeEntityManager(@Disposes EntityManager em){
        em.close();
    }

    @Produces
    public DB db(){
        return new DB(defaultDS);
    }

    @Produces @Auto @SessionScoped
    public Usuario userId(){
        Usuario u = new Usuario();
        u.setNome(req.getId());
        return u;
    }
}
