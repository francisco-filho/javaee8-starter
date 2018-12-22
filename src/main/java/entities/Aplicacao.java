package entities;

import javax.persistence.*;

@Entity
@Table(schema = "DB2ACS", name = "APPL")
public class Aplicacao {
    @Id
    @GeneratedValue
    @Column(name = "CD_APPL")
    private Integer id;
    @Column(name = "NM_APPL")
    private String nome;
    @Column(name = "TX_DSC_APPL")
    private String descricao;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
