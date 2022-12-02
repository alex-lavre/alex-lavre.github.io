let url = "https://en.wikipedia.org/w/api.php";

const fetchRandom = () => {
    url = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&formatversion=2&rnnamespace=0&rnlimit=1'
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            let res = responseData.query.random[0].title
            console.log(res)
            $("#title").text(res);
            return res
        })
        .catch(function(error){console.log(error);});
};


const searchPage = (title) => {
    let params = {
    action: "opensearch",
    namespace: "0",
    search: title,
    limit: "5",
    format: "json"
    }
    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            $("#title").attr("href", response[3][0]);
        })
        .catch(function(error){console.log(error);});
}   


$("#searchField").change(()=> {
    fetchRandom().then(randomTitle => searchPage(randomTitle))
    $("#modal").show("fast");
})