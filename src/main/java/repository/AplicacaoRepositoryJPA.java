package repository;

import entities.Aplicacao;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;

@JPA
@Named
@ApplicationScoped
public class AplicacaoRepositoryJPA implements AplicacaoRepository{
    @Inject
    EntityManager em;

    @Override
    public Aplicacao findOne(Integer key) {
        return em.find(Aplicacao.class, key);
    }

    @Override
    public List<Aplicacao> findAll() {
        return em.createQuery("select a from Aplicacao a").getResultList();
    }

    @Override
    public Aplicacao add(Aplicacao value) {
        em.persist(value);
        return value;
    }

    @Override
    public void update(Aplicacao value) {
        em.persist(value);
    }

    @Override
    public boolean delete(Integer key) {
        em.remove(em.find(Aplicacao.class, key));
        return true;
    }

    @Override
    public List<Aplicacao> query(Map<String, Object> params) {
        return null;
    }
}
