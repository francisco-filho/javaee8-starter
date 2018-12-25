package repository.acesso;

import entities.Aplicacao;
import jdbc.CondicaoWhere;
import repository.Jpa;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

@Jpa
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
        Aplicacao app = em.find(Aplicacao.class, value.getId());
        em.merge(value);
    }

    @Override
    public boolean delete(Integer key) {
        em.remove(em.find(Aplicacao.class, key));
        return true;
    }

    @Override
    public List<Aplicacao> query(CondicaoWhere map) {
        TypedQuery tq = buildTypedQuery(Aplicacao.class, em, map);
        return tq.getResultList();
    }
}
