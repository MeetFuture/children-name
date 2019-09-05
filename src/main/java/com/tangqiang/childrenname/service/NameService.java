package com.tangqiang.childrenname.service;

import com.tangqiang.childrenname.dao.NameDao;
import com.tangqiang.childrenname.entity.Name;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * TODO
 *
 * @author tqiang
 * @date 2019-08-30 14:42
 */
@Service
public class NameService {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private NameDao nameDao;

    /**
     * 新增
     *
     * @param name
     * @return
     */
    public Name add(Name name) {
        return nameDao.save(name);
    }

    /**
     * 删除
     *
     * @param name
     */
    public void del(Name name) {
        List<Name> all = nameDao.findAll(Example.of(name));
        nameDao.deleteInBatch(all);
    }

    /**
     * 获取所有的
     *
     * @param params
     * @return
     */
    public List<Name> getAll(Map<String, Object> params) {
        return nameDao.findAll(Sort.by("score").descending());
    }


    /**
     * 保存更新
     *
     * @param name
     * @return
     */
    public Name save(Name name) {
        return nameDao.save(name);
    }
}
