package com.tangqiang.childrenname.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 页面刷新时使用
 *
 * @author tqiang
 * @date 2019-08-29 08:41
 */
@Controller
public class IndexController {

    @RequestMapping(value = "/index")
    public String index() {
        return "/";
    }

    @RequestMapping(value = "/rating")
    public String rating() {
        return "/";
    }

    @RequestMapping(value = "/home")
    public String home() {
        return "/";
    }
}
