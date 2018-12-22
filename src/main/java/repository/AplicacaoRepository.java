package repository;

import entities.Aplicacao;

import javax.transaction.Transactional;

@Transactional
public interface AplicacaoRepository extends Repository<Aplicacao, Integer> {
}
