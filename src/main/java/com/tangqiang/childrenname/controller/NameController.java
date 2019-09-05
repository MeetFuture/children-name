package com.tangqiang.childrenname.controller;

import com.tangqiang.childrenname.entity.Name;
import com.tangqiang.childrenname.service.NameLocalBuildService;
import com.tangqiang.childrenname.service.NameServerBuildService;
import com.tangqiang.childrenname.service.NameService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 接口处理
 *
 * @author tqiang
 * @date 2019-08-27 22:38
 */
@RestController
@RequestMapping(value = "/api/name")
public class NameController {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Value("${name.random}")
    private String type;
    @Value("${name.config}")
    private String config;

    @Autowired
    private NameLocalBuildService nameBuildService;
    @Autowired
    private NameServerBuildService nameServerService;
    @Autowired
    private NameService nameService;

    @GetMapping(value = "/config")
    public String config() {
        return config;
    }

    @PostMapping(value = "/random")
    public List<String> random(@RequestBody Map<String, Object> params) {
        logger.info("Random:" + params);
        List<String> names = new ArrayList<>();
        switch (type) {
            case "server":
                names = nameServerService.get(params);
                break;
            case "local":
            default:
                names = nameBuildService.get(params);
                break;
        }
        return names;
    }


    @PostMapping(value = "/add")
    public Map<String, Object> addName(@RequestBody Name params) {
        logger.info("addName:" + params);
        Name name = nameService.add(params);
        Map<String, Object> result = new HashMap<>();
        result.put("result", name);
        return result;
    }


    @PostMapping(value = "/del")
    public Map<String, Object> removeName(@RequestBody Name params) {
        logger.info("delName:" + params);
        Map<String, Object> result = new HashMap<>();
        nameService.del(params);
        result.put("result", "success");
        return result;
    }

    @PostMapping(value = "/all")
    public List<Name> getAll(@RequestBody Map<String, Object> params) {
        logger.info("selected:" + params);
        return nameService.getAll(params);
    }


    @PostMapping(value = "/save")
    public Name save(@RequestBody Name params) {
        logger.info("Save:" + params);
        return nameService.save(params);
    }

}
