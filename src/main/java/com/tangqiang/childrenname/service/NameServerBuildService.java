package com.tangqiang.childrenname.service;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * TODO
 *
 * @author tqiang
 * @date 2019-08-28 16:30
 */
@Service
public class NameServerBuildService {
    private Logger logger = LoggerFactory.getLogger(getClass());

    /**
     * @param params
     * @return
     */
    public List<String> get(Map<String, Object> params) {
        int num = getParams("num", params);
        List<String> names = new ArrayList<>();
        try (CloseableHttpClient httpclient = HttpClients.createDefault()) {

            List<NameValuePair> form = new ArrayList<>();
            Set<String> keys = params.keySet();
            keys.forEach(key -> form.add(new BasicNameValuePair(key, params.get(key) != null ? params.get(key).toString() : "")));

            UrlEncodedFormEntity entity = new UrlEncodedFormEntity(form, Consts.UTF_8);
            HttpPost httpPost = new HttpPost("https://www.qmsjmfb.com/");
            httpPost.setEntity(entity);
            logger.info("Executing request " + httpPost.getRequestLine());

            ResponseHandler<String> responseHandler = response -> {
                int status = response.getStatusLine().getStatusCode();
                if (status >= 200 && status < 300) {
                    HttpEntity responseEntity = response.getEntity();
                    return responseEntity != null ? EntityUtils.toString(responseEntity) : null;
                } else {
                    throw new ClientProtocolException("Unexpected response status: " + status);
                }
            };
            String responseBody = httpclient.execute(httpPost, responseHandler);
            logger.info("----------------------------------------");
            Document doc = Jsoup.parse(responseBody);
            Elements lis = doc.select(".name_show > li");
            for (Element li : lis) {
                String name = li.text().trim();
                names.add(name);
            }
            if (names.size() > num) {
                names = names.subList(0, num);
            }
        } catch (Exception e) {
            logger.error("Error ", e);
        }
        return names;
    }

    private int getParams(String key, Map<String, Object> params) {
        int value = 0;
        try {
            String data = params.get(key) != null ? params.get(key).toString() : "";
            value = Integer.parseInt(StringUtils.getDigits(data));
        } catch (Exception ignored) {
        }
        return value;
    }
}
