package jdbc;

import javax.sql.DataSource;
import java.sql.*;
import java.util.*;

public class DB {

    private DataSource dataSource;

    public DB(DataSource ds){
        this.dataSource = ds;
    }

    public Optional<Map<String, Object>> first(String sql, Object... params){
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(sql);
            for (int i = 1; i <= params.length; i++) {
                stmt.setObject(i, params[i-1]);
            }
            ResultSet rs = stmt.executeQuery();
            ResultSetMetaData rsm = rs.getMetaData();
            int columnCount = rsm.getColumnCount();

            if (rs.next()) {
                Map<String, Object> map = new LinkedHashMap<>();
                for (int i = 1; i <= params.length; i++) {
                    map.put(rsm.getColumnName(i), rs.getObject(i));
                }
                return Optional.of(map);
            } else {
                return Optional.empty();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<Map<String, Object>> list(String sql, Object... params){
        List<Map<String, Object>> result = new ArrayList<>();

        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(sql);
            for (int i = 1; i <= params.length; i++) {
                stmt.setObject(i, params[i-1]);
            }
            ResultSet rs = stmt.executeQuery();
            ResultSetMetaData rsm = rs.getMetaData();
            int columnCount = rsm.getColumnCount();

            while (rs.next()) {
                Map<String, Object> map = new LinkedHashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    map.put(rsm.getColumnName(i), rs.getObject(i));
                }
                result.add(map);
            }
            return result;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public int executeUpdate(String sql, Object... params) {
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(sql);
            for (int i = 1; i <= params.length; i++) {
                stmt.setObject(i, params[i-1]);
            }
            return stmt.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e.getNextException());
        }
    }

    public int insertAndReturnId(String sql, Object... params){
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();
            rs.next();
            return rs.getInt(1);
        } catch (SQLException e) {
            throw new RuntimeException(e.getNextException());
        }
    }

    public <T> List<T> queryForList(String sql, Class<T> type, RowMapper<T> fn, Object ...values) {
        List<T> list = new ArrayList<>();

        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(sql);

            for (int i = 0; i < values.length; i++) {
                stmt.setObject(i+1, values[i]);
            }
            ResultSet rs = stmt.executeQuery();
            int i = 0;
            while (rs.next()) {
                list.add(fn.rowMapper(rs, ++i));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return list;
    }

    public <T> Optional<T> queryForObject(String sql, Class<T> type, RowMapper<T> fn, Object... values) {
        T result = null;
        try (Connection conn = dataSource.getConnection()) {
            PreparedStatement stmt = conn.prepareStatement(sql);

            for (int i = 0; i < values.length; i++) {
                stmt.setObject(i+1, values[i]);
            }

            ResultSet rs = stmt.executeQuery();
            if (rs.next()){
                return Optional.of(fn.rowMapper(rs,0));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return Optional.ofNullable(result);
    }

}
