(async function () {
  let productArr = window.location.pathname.split("/").filter((el) => el.length > 0);
  let handle = productArr[productArr.indexOf("products") + 1];

  let url = "/products/" + handle + ".js";
  let data = await window.fetch(url);
  let res = await data.json();
  let varIds = res["variants"].map((elem) => elem.id);
  let proId = String(res.id);

  let allProductForms = [...document.querySelectorAll("form[action*='/cart/add']")];
  console.log(allProductForms);

  let masterForms = allProductForms.reduce((found, form) => {
    let formHtml = form.outerHTML;
    let formHtmlIncludes =
      formHtml.includes(proId) ||
      varIds.find((elem) => {
        if (formHtml.includes(String(elem))) {
          return elem;
        }
      });

    if (formHtmlIncludes && form.style.display != "none" && form.style.visiblity != "hidden") {
      let button = form.querySelectorAll("[type='submit'], [name='add'], [id*=AddToCart]");
      if (button.length > 0) {
        found.push(form);
      }
    }
    return found;
  }, []);

  console.log(masterForms);

  masterForms.forEach((items) => {
    items.style.border = "2px solid #ff0000";
  });
})();
