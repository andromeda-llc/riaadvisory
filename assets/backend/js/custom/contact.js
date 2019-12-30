$(document).ready(function () {
    function loadGoster() {
        $("#sakliLoad>img").remove();
        $("#sakliLoad>input").show();
    }
    function loadGizle() {
        $("#sakliLoad>input").hide();
        $("#sakliLoad").append('<img id="theImg" style="display: block;margin-left: 50%" src="' + SITE_URL + '/assets/backend/img/ajax-loader.gif" />');
    }
    myTable = $("#dataTable").DataTable();
    //buton toggle
    $(document).on('click', 'a#formToggle', function (e) {
        var kapaliacik = $("input[name=kapaliacik]").val();
        var duzenleme = $("input[name=duzenleme]").val();
        if (kapaliacik == 0) {
            $("input[name=kapaliacik]").val(1);
            if (duzenleme == 0) {
                $("input[name=duzenleme]").val(0);
                $("input[name=duzenlemeID]").val(-1);
                $("input[name=baslik]").val("");
                CKEDITOR.instances['blog_icerik'].setData("");
                $("#image-holder").empty();
                $("#image-holder").prepend('<img id="theImg" src="' + SITE_URL + '/assets/backend/img/no-image.png' + '" class="thumb-image img-responsive" style="width:auto;max-width:100%;height:auto;max-height:100%;"/>');
                $("input[name=eskiBaslik]").val("");
            }
        } else {
            $("input[name=duzenleme]").val(0);
            $("input[name=kapaliacik]").val(0);
            $("input[name=duzenlemeID]").val(-1);
            $("input[name=baslik]").val("");
            CKEDITOR.instances['blog_icerik'].setData("");
            $("input[name=eskiBaslik]").val("");
        }
    });
    //silme butonu
    $(document).on('click', 'button#sil', function (e) {
        var ID = $(this).parent().parent().attr('id');
        alertify.confirm("Are you sure you want to delete it ?", function (e) {
            if (e) {
                $.ajax({
                    type: "Post",
                    url: SITE_URL + "/admin/contact/contactSil/" + ID,
                    cache: false,
                    dataType: "json",
                    data: {},
                    success: function (cevap) {
                        if (cevap.hata) {
                            alertify.alert('ERROR', cevap.hata);
                            return false;
                        } else {
                            if (cevap.result) {
                                alertify.alert('SUCCESS', cevap.result, function () {
                                    setTimeout(function () {
                                        window.location.reload(1);
                                    }, 1000);
                                });
                            }
                        }
                    }
                });
            } else {
                alertify.error("Silmekten vazgeçtiniz .");
            }
        });
    });
    //buton kaydet
    
    //table düzenle butonları
    $(document).on('click', 'button#duzenle', function (e) {
        var ID = $(this).parent().parent().attr('id');
        $.ajax({
            type: "post",
            url: SITE_URL + "admin/contact/contactBul/" + ID,
            dataType: "json",
            cache: false,
            data: {},
            success: function (cevap) {
                if (cevap.hata) {
                    reset();
                    alertify.alert(cevap.hata);
                    return false;
                } else {
                    if (cevap.result) {
                       $("input[name=name]").val(cevap.result.name);
                       $("input[name=email]").val(cevap.result.email);
                       $("input[name=phone]").val(cevap.result.phone);
                       $("input[name=company]").val(cevap.result.company);
                       $("textarea[name=icerik]").val(cevap.result.message);
                       $("input[name=duzenlemeID]").val(ID);
                        var kapaliacik = $("input[name=kapaliacik]").val();
                        if (kapaliacik == 0) {
                            $("#formToggle").click();
                        }
                    }
                }
            }
        });
    });
});
$(function () {


    // $(".select2").select2();


    //iCheck for checkbox and radio inputs
//    $('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
//        checkboxClass: 'icheckbox_minimal-blue',
//        radioClass: 'iradio_minimal-blue'
//    });
    var image_holder = $("#image-holder");
    $("input[name=image]").on("change", function () {
        if (typeof (FileReader) != "undefined") {
            image_holder.empty();
            var reader = new FileReader();
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image img-responsive",
                    "style": "width:auto;max-width:100%;heaight:auto;max-height:100%;"
                }).appendTo(image_holder);

            }
            image_holder.show();
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            //alert("This browser does not support FileReader.");
        }
    });
    $("#vazgec").on("click", function () {
        $("#formToggle").click();
        $(".hidden-first").fadeOut();
    });
});
