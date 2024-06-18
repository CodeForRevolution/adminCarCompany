module.exports=function override(config){
    const fallback=config.resolve.fallback||{}
    Object.assign(fallback,{
        zlib: require.resolve("browserify-zlib"),
        querystring: require.resolve("querystring-es3"),
        stream: require.resolve("stream-browserify"),
        path: require.resolve("path-browserify"),
        buffer: require.resolve("buffer/"),
        util: require.resolve("util/"),
        assert: require.resolve("assert/"),
        fs:false,
        net:false
    })

    config.resolve.fallback=fallback;
    return config;
}