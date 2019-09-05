package com.tangqiang.childrenname.dao;

import com.tangqiang.childrenname.entity.Name;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Dao
 *
 * @author tqiang
 * @date 2019-08-30 14:35
 */
@Repository
public interface NameDao extends JpaRepository<Name, Long> {

}
