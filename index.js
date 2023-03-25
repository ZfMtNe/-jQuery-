(function () {
  // 找到全选框
  $(".checkAll").change(function () {
    // 但这里的全选框有两个当点击一个之后，这样写的话另外一个不会被选中
    // $(".checkItem").prop("checked", this.checked);
    $(":checkbox").not(this).prop("checked", this.checked);
    // setTotal();
  });
  function setTotal() {
    const checked = $(":checked").not(".checkAll");
    const number = checked.length;
    let sum = 0;
    // 拿到当前勾选的总数，和当前选中的商品数量
    checked.each((i, dom) => {
      const result = +$(dom)
        .parents(".item")
        .find(".sum em")
        .text()
        .replace("￥", "");
      sum += result;
    });
    // 设置已选几件商品数和合集价格
    $(".right").find(".nums em")[0].innerText = number;
    $(".right").find(".sums em")[0].innerText = `￥${sum.toFixed(2)}`;
  }

  // 复选框单个选择
  $(".checkItem").click(function () {
    const checkNumber = $(".checkItem:checked");
    const number = $(".checkItem");
    if (checkNumber.length < number.length) {
      $(".checkAll").prop("checked", "");
    }
    setTotal();
  });

  // 数量增减
  $(".decr").click(function (e) {
    e.preventDefault();
    const inp = $(this).nextAll("input");
    const newNumber = +inp.val() - 1;
    setNumber(inp, newNumber);
  });
  $(".incr").click(function (e) {
    e.preventDefault();
    const inp = $(this).prevAll("input");
    const newNumber = +inp.val() + 1;
    setNumber(inp, newNumber);
  });
  // 数量input监听
  // $("input").change(function () {
  //   const inp = $(this);
  //   const value = $(this).val();
  //   if (!value || value == 0) {
  //     $(this).val(1);
  //   }
  //   const newvalue = +value;
  //   setNumber(inp, newvalue);
  // });

  // 价格计算
  function setNumber(inp, number) {
    if (number <= 1) {
      number = 1;
    }
    inp.val(number);
    const totalNumber = inp.parents(".item").find(".sum em");
    const unitPrice = +inp
      .parents(".item")
      .find(".price em")
      .text()
      .replace("￥", "");
    const sum = (number * unitPrice).toFixed(2);
    totalNumber.text(`￥${sum}`);
    setTotal();
  }
  //单个删除
  $(".del a").click(function (e) {
    e.preventDefault();
    $(this).parents(".item").remove();
    setTotal();
  });

  // 删除选中商品
  $(".delChecked").click(function (e) {
    e.preventDefault();
    $(":checked").not(".checkAll").parents(".item").remove();
    setTotal();
  });
  // 清空购物车
  $(".clearAll").click(function (e) {
    e.preventDefault();
    $(".checkItem").parents(".item").remove();
    setTotal();
  });
})();
