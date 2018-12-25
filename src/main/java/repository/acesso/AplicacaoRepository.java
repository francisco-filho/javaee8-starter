package repository.acesso;

import entities.Aplicacao;
import repository.Repository;

import javax.transaction.Transactional;

@Transactional
public interface AplicacaoRepository extends Repository<Aplicacao, Integer> {
}
