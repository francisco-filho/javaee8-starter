package jdbc;

import java.util.ArrayList;
import java.util.List;

public class CondicaoWhere {
    private List<Condicao> condicoes = new ArrayList<>();
    private String order = null;

    private CondicaoWhere(){}

    public static CondicaoWhereBuilder builder(){
        return new CondicaoWhereBuilder();
    }

    public int size(){
        return condicoes.size();
    }

    public List<Condicao> getCondicoes() {
        return condicoes;
    }

    public String getOrdem() {
        return order;
    }

    public static class CondicaoWhereBuilder {
        List<Condicao> condicoes = new ArrayList<>();
        String order = null;

        public CondicaoWhereBuilder with(String key, Object value){
            condicoes.add(new Condicao(key, value));
            return this;
        }

        public CondicaoWhereBuilder with(String key, String signal, Object value){
            condicoes.add(new Condicao(key, signal, value));
            return this;
        }

        public CondicaoWhereBuilder orderBy(String ordem){
            order = ordem;
            return this;
        }

        public CondicaoWhere build(){
            CondicaoWhere cw = new CondicaoWhere();
            cw.condicoes.addAll(this.condicoes);
            cw.order = this.order;
            return cw;
        }
    }
}
