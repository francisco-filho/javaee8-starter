package jdbc;

public class Condicao {
    public String chave;
    public String sinal;
    public Object valor;

    public Condicao(String chave, String sinal, Object valor){
        this.chave = chave;
        this.sinal = sinal;
        this.valor = valor;
    }

    public Condicao(String chave, Object valor){
        this(chave, "=", valor);
    }
}
