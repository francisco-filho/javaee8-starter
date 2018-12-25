package entities;

import javax.json.bind.annotation.JsonbNillable;
import javax.persistence.*;

@Entity
@Table(name="perm", schema = "db2acs")
@JsonbNillable
@Cacheable(false)
public class Permissao {
    @Id
    @SequenceGenerator(name = "cd_perm_seq", sequenceName = "db2acs.perm_cd_perm_seq")
    @GeneratedValue(generator = "cd_perm_seq", strategy = GenerationType.SEQUENCE)
    @Column(name="cd_perm")
    private Integer cdPermissao;
    @Column(name="cd_papl")
    private Integer cdPapel;
    @Column(name="cd_usu")
    private String chave;
    @Column(name="cd_uor")
    private Integer uor;
    @Column(name="cd_uor_psc")
    private Integer uorPsc;
    @Column(name="cd_nvl_org")
    private String nivelOrganizacional;

    public Integer getCdPermissao() {
        return cdPermissao;
    }

    public void setCdPermissao(Integer cdPermissao) {
        this.cdPermissao = cdPermissao;
    }

    public Integer getCdPapel() {
        return cdPapel;
    }

    public void setCdPapel(Integer cdPapel) {
        this.cdPapel = cdPapel;
    }

    public String getChave() {
        return chave;
    }

    public void setChave(String chave) {
        this.chave = chave;
    }

    public Integer getUor() {
        return uor;
    }

    public void setUor(Integer uor) {
        this.uor = uor;
    }

    public Integer getUorPsc() {
        return uorPsc;
    }

    public void setUorPsc(Integer uorPsc) {
        this.uorPsc = uorPsc;
    }

    public String getNivelOrganizacional() {
        return nivelOrganizacional;
    }

    public void setNivelOrganizacional(String nivelOrganizacional) {
        this.nivelOrganizacional = nivelOrganizacional;
    }
}
