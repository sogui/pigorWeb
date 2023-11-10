/*!
 * Start Bootstrap - Freelancer v6.0.0 (https://startbootstrap.com/themes/freelancer)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-freelancer/blob/master/LICENSE)
 */
var candidat = new FormData();
var regionsSelect,
  departementsSelect,
  cavsSelect,
  cacrsSelect,
  communeActuelleSelect,
  attestation_experience_recensements,
  attestation_experience_enquetes,
  candidatTrouve,
  regionSelected,
  departementSelected,
  cavSelected,
  regionResidenceSelect,
  langues;

(function ($) {
  "use strict"; // Start of use strict
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 71,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });
  // Scroll to top button appear
  $(document).scroll(function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $(".scroll-to-top").fadeIn();
    } else {
      $(".scroll-to-top").fadeOut();
    }
  });
  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });
  // Activate scrollspy to add active class to navbar items on scroll
  /*$("body").scrollspy({
    target: "#mainNav",
    offset: 80,
  });*/
  // Collapse Navbar
  /*var navbarCollapse = function () {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };*/
  // Collapse now if page is not at top
  //navbarCollapse();
  // Collapse the navbar when page is scrolled
  //$(window).scroll(navbarCollapse);
  // Floating label headings for the contact form
  $(function () {
    $("body")
      .on("input propertychange", ".floating-label-form-group", function (e) {
        $(this).toggleClass(
          "floating-label-form-group-with-value",
          !!$(e.target).val()
        );
      })
      .on("focus", ".floating-label-form-group", function () {
        $(this).addClass("floating-label-form-group-with-focus");
      })
      .on("blur", ".floating-label-form-group", function () {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
  });
})(jQuery); // End of use strict
//wizard
$(document).ready(function () {
  $("#reseauSysteme").select2({
    language: "fr",
    width: 'resolve'
  });

  $("#sgbd").select2({
    language: "fr",
    width: 'resolve'
  });

  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;
  var previous_form, next_form; // form

  setProgressBar(current);

  $(".next").click(async function () {
    if (current == 1) {
      //populateArrnd(candidatTrouve.departement.id)
    }
    current_fs = $(this).parent();
    next_form = $(this).parent().parent().next();
    $(this).parent().parent().submit();
    var vld = this.parentElement.parentElement.checkValidity();

    if (!vld) {
      return;
    }
    var formData = new FormData(this.parentElement.parentElement);
    formData.forEach(function (value, key) {
      candidat.append(key, value);
    });

    console.log("candidat", candidat);

    if (current == 4) {
      var res = {};
      try {

        var codeValidation = $('input[name="captcha"]').val();
        res = await verifieCaptcha();
        console.log("validate Captcha", res);
        res = await sendData();
        if (candidat.id == null || candidat.id.length == 0) {
          $("h5.success-info-elmt").html(`<h5 class="purple-text text-center success-info-elmt">Vous venez de postuler avec succès, merci noter ces informations au cas où vous souhaiteriez modifier votre candidature . <br>Numéro de dossier: <strong>${res.numeroDossier}</strong>  <br>Code de validation: <strong>${codeValidation}</strong></h5></strong> `);
        } else {
          $("h5.success-info-elmt").html(`Vous venez de modifier votre dossier avec succès`);
        }

      } catch (error) {
        error = error != undefined ? error : { 'err': `${error?.err ? error?.err : error} Une erreur est survenue: Veuillez rafraîchir la page et continuez` };
        res.err = error?.err || error;
        // rouge pour le champ captcha
        $("#captchaErreur").remove();
        if (error != undefined && error.err != undefined && error.err == 'Votre catcha est incorrect') {
          $('input[name="captcha"]').after(`<small id="captchaErreur" class="text-danger">Votre catcha est incorrect</small>`);

        }
        if (res && res.err) {
          if (!$('#erreurCandidature').length) {
            $(this).parent().parent().before(`<div class="alert alert-danger" role="alert" id="erreurCandidature"></div>`);
          }
          $("#erreurCandidature").html(res.err + `<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>`);
          return;
        }
        $("#erreurCandidature").remove();
        console.log(res);
      }
    }

    next_fs = next_form.find("fieldset");
    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
    //show the next fieldset
    next_form.show();
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      {
        opacity: 0,
      },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;
          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({
            opacity: opacity,
          });
        },
        duration: 500,
      }
    );
    setProgressBar(++current);
  });

  $(".previous").click(function () {
    $('#erreurCandidature').remove();
    current_fs = $(this).parent();
    previous_form = $(this).parent().parent().prev();
    previous_fs = previous_form.find("fieldset");
    //Remove class active
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");
    //show the previous fieldset
    previous_form.show();
    previous_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      {
        opacity: 0,
      },
      {
        step: function (now) {
          // for making fielset appear animation
          opacity = 1 - now;
          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({
            opacity: opacity,
          });
        },
        duration: 500,
      }
    );
    setProgressBar(--current);
  });

  function verifieCaptcha() {
    var captchaForm = new FormData();
    captchaForm.append('captcha', $('input[name="captcha"]').val());
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': `${window.location.origin}${window.location.pathname}captchaValidate.php`,
        data: captchaForm,
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (a) {
          resolve(a);
        },
        error: function (xx) {
          reject(xx.responseJSON);
        }
      });
    });
  }

  function sendData() {
    console.log('send')
    var id = null;
    if (candidat.id.length != 0) {
      candidat.append('id', candidat.id);
      id = parseInt(candidat.id);
    }
    // candidat.reseauSysteme = JSON.stringify(candidat.reseauSysteme);
    var skills = $.isArray(candidat.reseauSysteme) ? candidat.reseauSysteme.join(',') : candidat.reseauSysteme;
    candidat.append('skills', skills);

    var skillsSgbd = $.isArray(candidat.sgbd) ? candidat.sgbd.join(',') : candidat.sgbd;
    candidat.append('db', skillsSgbd);

    console.log(candidat)
    console.log('send')
    return new Promise(function (resolve, reject) {
      
      $.ajax({
        'url': candidat.id.length == 0 ? `${PIGOR_BASE_URL}/atics/add` : `${PIGOR_BASE_URL}/atics/${id}/update`,
        //'url': `${PIGOR_BASE_URL}/atics/add`,
        data: candidat,
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (a) {
          resolve(a);
        },
        error: function (xx) {
          reject(xx.responseJSON);
        },
        beforeSend: function (xhr) {
          $('#postulerBtn').hide();
          $('#postulerBtnLoading').show();
          $('#postulerBtn').siblings('.previous').hide();
        },
        complete: function (xhr, status) {
          $('#postulerBtn').show();
          $('#postulerBtnLoading').hide();
          $('#postulerBtn').siblings('.previous').show();
        }
      });
    });
  }

  function sendSearch(nin) {
    const formData = new FormData();
    formData.append('search_nin', nin);
    console.log(formData)
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': `${PIGOR_BASE_URL}/atics/search`,
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (a) {
          resolve(a);
        },
        error: function (xx) {
          reject(xx);
        }
      });
    });
  }

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $(".submit").click(function () {
    return false;
  });

  $("form").not('#form_recherche').submit(function (event) {
    if (this.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.classList.add("was-validated");
    } else {
      this.classList.add("was-validated");
      event.preventDefault();
      event.stopPropagation();

      var idForm = $(this).attr("id");
      $(`#${idForm} input, #${idForm} select`).each(function () {
        var input = $(this);
        candidat[input.attr("name")] = input.val();
      });
    }
  });

  $('#form_recherche').submit(function () {
    const nin = $(this).find('[name="search_nin"]').val();
    sendSearch($(this).find('[name="search_nin"]').val()).then(function (data) {
      console.log(data);
      candidatTrouve = data;
      $('#exampleModal').find("h3").html(`${data.prenom} ${data.nom}`);
      $('#exampleModal').find("h5").html(`Numéro de Dossier: ${data.numeroDossier}`);
      $('#exampleModal').find("h6").html(`Adresse actuelle: ${data.adresse}`);

      $('#exampleModal').find(".media:nth-child(1)").find('p').html(`&nbsp;&nbsp;${data.nin}`);
      $('#exampleModal').find(".media:nth-child(2)").find('p').html(`&nbsp;&nbsp;Assistant TIC`);
      $('#exampleModal').find(".media:nth-child(3)").find('p').html(`&nbsp;&nbsp;${data?.custumArrnd1 ? data?.custumArrnd1?.nom : data?.arrnd1?.nom}`);
      $('#exampleModal').find(".media:nth-child(4)").find('p').html(`&nbsp;&nbsp;${data?.custumArrnd1 ? (data?.custumArrnd2?.nom || '') : (data?.arrnd2?.nom || '')}`);
      $('#exampleModal').find(".media:nth-child(5)").find('p').html(`&nbsp;&nbsp;${data?.custumArrnd3 ? (data?.custumArrnd3?.nom || '') : (data?.arrnd3?.nom || '')}`);
      $('#exampleModal').find(".media:nth-child(6)").find('p').html(`&nbsp;&nbsp;${data?.createAt || ''}`);

      $('#exampleModal').modal('show');

    }, function (error) {
      console.error(error);

      $('#noCandidatureHelp').html(`Pas de Candidature correspondant a ce numero ${nin} .`);
      $('#noCandidatureHelp').show();
      $('#exampleModal').modal('hide');
      setTimeout(function () {
        $('#noCandidatureHelp').hide();
        $('#noCandidatureHelp').html('');
      }, 5000);
    });
    return false;
  });
});

// load data

$(document).ready(function () {
  $("#attestationSearch").submit(rechercherAttestation);

  $("#afficheModalRecherche").on("show.bs.modal", function () {
    //$("#afficheModalRecherche input[name='nin']").val("");
    $("#afficheModalRecherche input[name='numeroDossier']").val("");
    $("#afficheModalRecherche input[name='codeValidation']").val("");
  });

  // $("#langue1").html(
  //   $("#langue1").html() +
  //   ["", ...langues].map((item) => {
  //     return `<option  value="${item}" >${item}</option>`;
  //   })
  // ); 

  // $("#langue2").html( $("#langue2").html() +
  //     ["", ...langues].map((item) => {
  //       return `<option  value="${item}" >${item}</option>`;
  //     })
  // ); 

  // $("#langue3").html( $("#langue3").html() +
  //     ["", ...langues].map((item) => {
  //       return `<option  value="${item}" >${item}</option>`;
  //     })
  // ); 

  $("#situation_matrimoniale").select2({
    placeholder: "Choisir Votre Situation Matrimoniale",
    theme: "bootstrap4"
  });

  // $("#poste_souhaite").select2({
  //   placeholder: "Choisir Votre Poste Souhaité",
  //   theme: "bootstrap4"
  // });

  // langues =  $("#langue1, #langue2, #langue3").select2({
  //   placeholder: "Choisir une langue",
  //   theme: "bootstrap4",
  //   allowClear: true,
  // });

  regionResidenceSelect = $("#regionResidence").select2({
    language: "fr",
    theme: "bootstrap4",
    placeholder: "Choisir Région",
    ajax: {
      url: function (params) {
        return `${PIGOR_BASE_URL}/regions${params.term == undefined ? '' : `?term=${params.term}`}`
      },
      dataType: 'json',
      data: function (params) {
        var query = {
          term: params.term,
        };
        return query;
      },
      processResults: function (regions) {
        return {
          results: regions.map(function (region) { var r = { id: region.code, text: `${region.nom}` }; return r }),
          total: regions.length
        };
      }
    }
  });

  regionsSelect = $("#region").select2({
    language: "fr",
    theme: "bootstrap4",
    placeholder: "Choisir Région",
    ajax: {
      url: function (params) {
        return `${PIGOR_BASE_URL}/regions${params.term == undefined ? '' : `?term=${params.term}`}`
      },
      dataType: 'json',
      data: function (params) {
        var query = {
          term: params.term,
        };
        return query;
      },
      processResults: function (regions) {
        return {
          results: regions.map(function (region) { var r = { id: region.id, text: `${region.nom}` }; return r }),
          total: regions.length
        };
      }
    }
  });

  $('#region').on('select2:select', function () {

    $('#departement').val(null).trigger('change');
    //$('#cav').html("");
    $('#cacr').html("");
    $('#cacr2').html("");
    $('#cacr3').html("");

    // $("#cav").select2({
    //     language: "fr",
    //     theme: "bootstrap4",
    //     data: [],
    // });
    $("#cacr").select2({
      language: "fr",
      theme: "bootstrap4",
      data: []
    });
    $("#cacr2").select2({
      language: "fr",
      theme: "bootstrap4",
      data: []
    });
    $("#cacr3").select2({
      language: "fr",
      theme: "bootstrap4",
      data: []
    });
  });

  $('#departement').on('select2:select', function (e) {
    // $("#cav").empty();

    $('#cacr').html("");
    $('#cacr2').html("");
    $('#cacr3').html("");

    $("#cacr").select2({
      language: "fr",
      theme: "bootstrap4",
      data: []
    });
    $("#cacr2").select2({
      language: "fr",
      theme: "bootstrap4",
      data: []
    });
    $("#cacr3").select2({
      language: "fr",
      theme: "bootstrap4",
      data: []
    });
    // Populate cav select2
    var id = $(this).val();
    $.ajax({
      url: `${PIGOR_BASE_URL}/dept_arrnd/${id}`, // don't hard code your url's
      dataType: "json",
      method: "GET",
      success: function (cavList) {
        var data = [];
        //console.log(cavList)

        let first_id = $('#shop-id option:eq(1)').val();
        $('#cav').val(first_id).trigger('change.select2');

        data.push({
          id: '',
          text: 'Choisir un arrondissement'
        });

        cavList.forEach(s => {
          data.push({
            id: s.id,
            text: s.nom
          });
        });

        $('#cacr').select2({
          language: "fr",
          theme: "bootstrap4",
          placeholder: "Choisir un arrondissement",
          data: data
        });

        $('#cacr2').select2({
          language: "fr",
          theme: "bootstrap4",
          placeholder: "Choisir un arrondissement",
          data: data
        });

        $('#cacr3').select2({
          language: "fr",
          theme: "bootstrap4",
          placeholder: "Choisir un arrondissement",
          data: data
        });


      }
    });

  });

  departementsSelect = $("#departement").select2({
    language: "fr",
    theme: "bootstrap4",
    placeholder: "Choisir Département",
    ajax: {
      url: function (params) {
        var myRegion = $("#region").val();
        return `${PIGOR_BASE_URL}/departements?region=${myRegion}${params.term == undefined ? '' : `&term=${params.term}`}`
      },
      dataType: 'json',
      data: function (params) {
        var query = {
          term: params.term,
        };
        // Query parameters will be ?search=[term]&type=public
        return query;
      },
      processResults: function (regions) {
        return {
          results: regions.map(function (region) { var r = { id: region.id, text: `${region.nom}` }; return r }),
          total: regions.length
        };
      }
    }
  });

  cavsSelect = $("#cav").select2({
    language: "fr",
    theme: "bootstrap4",
    placeholder: "Choisir Commune/Arrondissement/Ville",
    ajax: {
      url: function (params) {
        var departementId = $("#departement").val();
        return `${PIGOR_BASE_URL}/cavs?departement=${departementId || ''}${params.term == undefined ? '' : `&term=${params.term}`}`
      },
      dataType: 'json',
      data: function (params) {
        var query = {
          term: params.term,
        };
        return query;
      },
      processResults: function (regions) {
        return {
          results: regions.map(function (region) { var r = { id: region.id, text: `${region.nom}` }; return r }),
          total: regions.length
        };
      }
    }
  });

  cacrsSelect = $("#cacr,#cacr2,#cacr3").select2({
    language: "fr",
    theme: "bootstrap4",
    placeholder: "Choisir Arrondissement",
    ajax: {
      url: function (params) {
        var id = $("#departement option:selected").val();
        return `${PIGOR_BASE_URL}/dept_arrnd/${id}`
      },
      dataType: 'json',
      data: function (params) {
        var query = {
          term: params.term,
        };
        return query;
      },
      processResults: function (regions) {
        var cacrsDeficit = [];
        regions.map(function (cacr) {
          cacrsDeficit.push({ id: cacr.id, text: `${cacr.nom}` });
        });

        return {
          results: cacrsDeficit,
          total: cacrsDeficit.length
        };
      }
    }
  });


  $("#communeActuelle").select2({
    language: "fr",
    theme: "bootstrap4",
    placeholder: "Choisir Commune",
    ajax: {
      url: function (params) {
        var regionCode = $("#regionResidence").val();
        return `${PIGOR_BASE_URL}/cacrs?regionCode=${regionCode || ''}${params.term == undefined ? '' : `&term=${params.term}`}`
      },
      dataType: 'json',
      data: function (params) {
        var query = {
          term: params.term,
        };
        return query;
      },
      processResults: function (regions) {
        return {
          results: regions.map(function (region) { var r = { id: region.id, text: `${region.nom}` }; return r }),
          total: regions.length
        };
      }
    }
  });

  cacrsSelect.on("select2:select", function (event) {

    const currentCacrIdHElement = $(this);
    const currentCacrId = event.params.data.id;
    const currentCacrIdHtml = $(this).attr('id');

    const alreadySelected = $('#cacr, #cacr2 , #cacr3').toArray().filter(function (cacr) {
      return currentCacrIdHtml != cacr.id;
    }).find(function (cacr) {
      return (cacr.value == currentCacrId && currentCacrId != "")
    });

    console.log("alreadySelected", alreadySelected);
    $("#cacrErreur").remove();
    currentCacrIdHElement.removeClass('is-invalid');
    if (alreadySelected) {
      //currentCacrIdHElement.val= '' ;
      currentCacrIdHElement.addClass('is-invalid');
      currentCacrIdHElement.val('').trigger('change');
      currentCacrIdHElement.siblings('span').after(`<small id="cacrErreur" class="text-danger">Vous avez déja choisi  ${event.params.data.text}.</small>  `);

    }

  });

  // langues.on("select2:select", function (event) {
  //   const currentLangue = $(this) ;
  //   const currentLangueValue = event.params.data.id ;
  //   $(`#langueErreur`).remove();
  //   currentLangue.removeClass('is-invalid')
  //   var dejaChoisi =  $(`#langue1,#langue2,#langue3`).not(`#${currentLangue.attr('id')}`).toArray().map(function(l){console.log(l); return l.value;}).indexOf(currentLangueValue) != -1 ;
  //  if(dejaChoisi){
  //   currentLangue.addClass('is-invalid');
  //   currentLangue.val('').trigger('change');
  //   currentLangue.siblings('span').after(`<small id="langueErreur" class="text-danger">Vous avez déja choisi  ${event.params.data.text}.</small>  `);
  //  }
  //});

  $('form#step3 select[name=diplome').change(function (e) {
    const dple = $(this).val();
    if (dple) {
      $('form#step3 [name=dernierDiplomeFichier').siblings(".fieldlabels").html(`Copie légalisée du ${dple == 'BAC + 2 en informatique' ? dple : dple} : * `);
    }

  });

  $('form select[name="nbre_recensement"], form select[name="nbre_enquete"]').change(function (e) {

    var name = $(this).attr('name');
    var val = $(this).val();
    val = parseInt(val);
    if ($('input[name="experienceRecensement"]:checked').val() == '0') {
      val = 0;
      $(".dynamicRow").html("");
    }
    var htmlValue = '';
    var idZoneAttestion = name == 'nbre_recensement' ? 'zone_attestation_experience_recensements' : (name == 'nbre_enquete' ? 'zone_attestation_experience_enquetes' : '');
    var fieldNameAttestation = name == 'nbre_recensement' ? 'attestation_experience_recensements' : (name == 'nbre_enquete' ? 'attestation_experience_enquetes' : '');
    var typeAttestation = name == 'nbre_recensement' ? 'Recensement' : (name == 'nbre_enquete' ? 'Enquete' : '');
    console.log(e, name, val);
    for (var i = 1; i <= val; i++) {
      var piecejointe = ``;
      if (nbrEnq >= i) {
        let nin = $('input[name="nin"]').val();
        piecejointe = `<small  class='form-text text-muted'> <a href='${PIGOR_BASE_URL}/getAticOneFile/${nin}/${numdossier}/${xarlemey}/7${i}' target='_blank'>Voir le fichier</a> </small>`;
      }
      htmlValue += `
        <div class="row dynamicRow">
              <div class="col-md-12">
                  <label class="fieldlabels">Attestation d'expérience  ${typeAttestation} ${i}</label>
                  ${piecejointe}
                  <input type="file" class="form-control" name="${fieldNameAttestation}_${i}" placeholder="Attestation d'experience" ${nbrEnq >= i ? '' : 'required'} accept="application/pdf,image/*"   >
              </div>
        </div>`;
    }
    $(`#${idZoneAttestion}`).html(htmlValue);
    $(`#${idZoneAttestion} input[type="file"]`).each(function () {
      $(this).change(checkFileUpload);
    });
    $(`#${idZoneAttestion}`).css('visibility', val > 0 ? 'visible' : 'hidden');
  });

  $('input[name="experienceRecensement"]').change(function (e) {
    var name = 'nbre_recensement';
    var val = $(this).val();
    val = parseInt(val);
    if ($('input[name="experienceRecensement"]:checked').val() == '0' || val == 0) {
      val = 0;
      $(".dynamicRow").html("");
      $('#nbre_recensement option').each(function (e) {
        if ($(this).val() == '') {
          $(this).prop('selected', true);
        }
      })
    } else {
      val = 1;
      val = nbrEnq > 0 ? nbrEnq : val;
      $('#nbre_recensement option').each(function (e) {
        if ($(this).val() == val) {
          $(this).prop('selected', true);
        }
      })
    }

    var htmlValue = '';
    var idZoneAttestion = name == 'nbre_recensement' ? 'zone_attestation_experience_recensements' : (name == 'nbre_enquete' ? 'zone_attestation_experience_enquetes' : '');
    var fieldNameAttestation = name == 'nbre_recensement' ? 'attestation_experience_recensements' : (name == 'nbre_enquete' ? 'attestation_experience_enquetes' : '');
    var typeAttestation = name == 'nbre_recensement' ? 'Recensement' : (name == 'nbre_enquete' ? 'Enquete' : '');
    console.log(e, name, val);
    for (var i = 1; i <= val; i++) {
      var piecejointe = ``;
      if (nbrEnq >= i) {
        let nin = $('input[name="nin"]').val();
        piecejointe = `<small  class='form-text text-muted'> <a href='${PIGOR_BASE_URL}/getAticOneFile/${nin}/${numdossier}/${xarlemey}/7${i}' target='_blank'>Voir le fichier</a> </small>`;
      }

      htmlValue += `
      <div class="row dynamicRow">
          <div class="col-md-12">
            <label class="fieldlabels">Attestation d'expérience  ${typeAttestation} ${i}</label>
            ${piecejointe}
            <input type="file" class="form-control" name="${fieldNameAttestation}_${i}" placeholder="Attestation d'experience" ${nbrEnq >= i ? '' : 'required'} accept="application/pdf,image/*"   >
          </div>
      </div>`;
    }
    $(`#${idZoneAttestion}`).html(htmlValue);
    $(`#${idZoneAttestion} input[type="file"]`).each(function () {
      $(this).change(checkFileUpload);
    });
    $(`#${idZoneAttestion}`).css('visibility', val > 0 ? 'visible' : 'hidden');
  });

  //attestation_experience  
  //attestation_certification
  $('form input[name=experienceRecensement').change(function () {
    const experienceRecensement = $(this).val();


    //  head show hide nbre recensement
    if (experienceRecensement == '1') {
      $('form select[name=nbre_recensement]').closest('div.col-md-12.col-lg-6').css('visibility', 'visible');
      $('form select[name=nbre_recensement]').prop('required', true);
      /* $('form input[name="attestation_experience_recensements[]"]').closest('div.col-md-12.col-lg-6').css('visibility', 'visible') ;
      $('form input[name="attestation_experience_recensements[]"]').prop('required',true); */
    } else {
      $('form select[name=nbre_recensement]').closest('div.col-md-12.col-lg-6').css('visibility', 'hidden');
      $('form select[name=nbre_recensement]').prop('required', false);
      /*   $('form input[name="attestation_experience_recensements[]"]').closest('div.col-md-12.col-lg-6').css('visibility', 'hidden') ;
        $('form input[name="attestation_experience_recensements[]"]').prop('required',false); */
    }
    // end  show hide nbre recensement      
  });

  $('form input[name=experienceEnquete').change(function () {
    const experienceEnquete = $(this).val();
    //  head show hide nbre Enquete
    if (experienceEnquete == '1') {
      $('form select[name=nbre_enquete]').closest('div.col-md-12.col-lg-6').css('visibility', 'visible');
      $('form select[name=nbre_enquete]').prop('required', true);
      /*  $('form input[name="attestation_experience_enquetes[]"]').closest('div.col-md-12.col-lg-6').css('visibility', 'visible') ;
      $('form input[name="attestation_experience_enquetes[]"]').prop('required',true); */
    } else {
      $('form select[name=nbre_enquete]').closest('div.col-md-12.col-lg-6').css('visibility', 'hidden');
      $('form select[name=nbre_enquete]').prop('required', false);
      /*  $('form input[name="attestation_experience_enquetes[]"]').closest('div.col-md-12.col-lg-6').css('visibility', 'hidden') ;
      $('form input[name="attestation_experience_enquetes[]"]').prop('required',false); */
    }
    // end  show hide nbre Enquete  
  });

  $('input[type="file"]').change(checkFileUpload);

  $('#captcha_reload').on('click', function (e) {
    e.preventDefault();
    d = new Date();
    var src = $("img#captcha_image").attr("src");
    src = src.split(/[?#]/)[0];
    $("img#captcha_image").attr("src", src + '?' + d.getTime());
  });

  ReLoadImages();

  $('#formConfirmationCandidat').on('submit', function (e) {

    validerConfirmation($(this));
    return false;
  });

});

function checkFileUpload(e) {
  $(`#erreurFichier_${$(this).attr('id')}`).remove();
  if ($(this)[0].files.length > 0 && ($(this)[0].files[0].size / 1000000).toFixed(1) > 5) { // taille limit O.5 mb per file
    var sizeKb = ($(this)[0].files[0].size / 1000000).toFixed(1);
    $(this).after(`<small id="erreurFichier_${$(this).attr('id')}" class="text-danger">taille ${sizeKb} Mb trop  grand , elle doit etre inferieur ou égale 5 Mb .</small>  `);
    $(this).val(null);
    return;
  }
  var extensionFile = $(this).val().split('.').pop();
  var allowedExtension = ["JPG", "JPEG", "PNG", "GIF", "TIFF", "PSD", "PDF", "BMP", "JP2", "J2K", "JPF", "JPK", "JPM", "MJ2", "TIFF", "TIF", "PDF"];
  if (allowedExtension.indexOf(extensionFile.toUpperCase()) == -1) {
    $(this).after(`<small id="erreurFichier_${$(this).attr('id')}" class="text-danger">Extension Fichier ${extensionFile}  non reconnu , seulement ${allowedExtension.join(',')} sont autorisés .</small>  `);
    $(this).val(null);
    return;
  }
}

function modifierCandidat(curentPageURL) {
  var result = document.getElementById('afficheModalRechercheForm').checkValidity();
  if (result) {
    var id = $("#afficheModalRecherche input[name='id']").val();
    var nin = $("#afficheModalRecherche input[name='nin']").val();
    var numeroDossier = $("#afficheModalRecherche input[name='numeroDossier']").val();
    var codeValidation = $("#afficheModalRecherche input[name='codeValidation']").val();

    const res = verifierCodeValidation(nin, numeroDossier, codeValidation).then(function (res) {
      $('#afficheModalRechercheForm .alert.alert-danger').remove();
      if (!res.status) {
        $('#afficheModalRechercheForm').prepend(`<div class="alert alert-danger" role="alert"> <p>Le code validation est incorrect !</p> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button><hr><p>Il s'agit du code de validation qui vous ait été retourné après soumission de candidature</p> </div>`);
        return;
      }
      $('#afficheModalRechercheForm').prepend(`<div class="alert alert-success" role="alert"> <p>Le code validation est correct! Patientez un peu, vous serait redirigé vers la page de modification !</p></div>`);
      console.log(res);

      let first_id = $('#departement option:eq(1)').val();
      $('#departement').val(first_id).trigger('change.select2');

      var form = document.createElement("form");
      var element1 = document.createElement("input");
      var element2 = document.createElement("input");
      var element3 = document.createElement("input");
      var element4 = document.createElement("input");

      form.method = "POST";
      form.action = `${curentPageURL}#postuler`;
      /**
      * id
      */
      element1.value = id;
      element1.name = "candidatToEdit";
      form.appendChild(element1);
      /**
       * nin
      */
      element2.value = nin;
      element2.name = "nin";
      form.appendChild(element2);
      /**
       * Numero de Dossier
      */
      element3.value = numeroDossier;
      element3.name = "numeroDossier";
      form.appendChild(element3);

      /**
       * code de validation
      */
      element4.value = codeValidation;
      element4.name = "codeValidation";
      form.appendChild(element4);

      document.body.appendChild(form);
      form.submit();

    }, function (err) {
      console.err(err);

    });
  }

}

function afficherModifierCandidat() {
  var nin = candidatTrouve.nin;
  var id = candidatTrouve.id;
  $('#afficheModalRecherche input[name="nin"]').val(nin);
  $('#afficheModalRecherche input[name="id"]').val(id);
  $('#exampleModal').modal('hide');
  $('#afficheModalRecherche').modal('show');
}

function ReLoadImages() {
  $('img[data-lazysrc]').each(function () {
    $(this).attr('src', $(this).attr('data-lazysrc'));
  }
  );
}

function verifierCodeValidation(nin, numeroDossier, codeValidation) {
  var formContent = new FormData();
  formContent.append('nin', nin);
  formContent.append('numeroDossier', numeroDossier);
  formContent.append('codeValidation', codeValidation);
  return new Promise(function (resolve, reject) {
    $.ajax({
      'url': `${PIGOR_BASE_URL}/atics/allowRepostuler`,
      data: formContent,
      type: 'POST',
      contentType: false,
      processData: false,
      dataType: 'json',
      success: function (a) {
        resolve(a);
      },
      error: function (xx) {
        reject(xx.responseJSON);
      }
    });
  });
}

function enableValidation(event) {
  if (event.target.value == '1' || event.target.value == '0') {
    $('#btn_confirmation_Candidature').prop('disabled', false);
  }

}

function validerConfirmation(thisForm) {
  var codeValidation = thisForm.find("[name='codeValidation']").val();
  var numeroDossier = thisForm.find("[name='numeroDossier']").val();
  var id = thisForm.find("[name='id']").val();
  var nin = thisForm.find("[name='nin']").val();
  var newStatut = $('[name="statut_confirmation"]:checked').val();
  var formData = new FormData();
  formData.append('nin', nin);
  formData.append('id', id);
  formData.append('numeroDossier', numeroDossier);
  formData.append('codeValidation', codeValidation);
  formData.append('newStatut', newStatut);

  $.ajax({
    'url': `${PIGOR_BASE_URL}/candidatConfirmDisponibilite`,
    type: 'POST',
    data: formData,
    contentType: false,
    processData: false,
    dataType: 'json',
    beforeSend: function (xhr) {
      $('#erreurConfirmationCandidat').css('visibility', 'hidden');
    },
    success: function (data) {
      console.log(data);
      $('#erreurConfirmationCandidat').removeClass('alert-danger');
      $('#erreurConfirmationCandidat').addClass('alert-success');
      $('#erreurConfirmationCandidat').html("Vous venez de confirmer avec success");
      $('#erreurConfirmationCandidat').css('visibility', 'visible');
      setTimeout(function () {
        $('#confirmationCandidat').modal('hide');
        document.location.href = document.location.origin;
      }, 5000
      );
    },
    error: function (err) {
      $('#erreurConfirmationCandidat').css('visibility', 'visible');
      $('#erreurConfirmationCandidat').html(err?.responseJSON?.error != null ? err?.responseJSON?.error : 'Une erreur est survenue');
    }
  });


}

function rechercherAttestation(event) {
  event.preventDefault();
  var nin = $(this).find('input[name="nin"]').val();
  $('#noAttestationHelp').html(``);
  $.ajax({
    'url': `${PIGOR_BASE_URL}/attestations/agents/${nin}`,
    type: 'GET',
    contentType: false,
    processData: false,
    dataType: 'json',
    success: function (results) {
      console.log(results);
      if (results != null && results.length > 0) {
        var titre = `Listes des attestations pour ${results[0].prenom}  ${results[0].nom} [${results[0].nin}]`;
        var elements = results.map(function (item) {
          return `
                <tr data-enquete="${item.idEnquete}" data-agent="${item.id}" data-nin="${item.nin}" >
                  <td>${item.nomCategorie}</td>
                  <td>${item.nomEnquete}</td>
                  <td><a href="${PIGOR_BASE_URL}/attestations/agents/enquete/${item.nin}/${item.idEnquete}" target="_blank"><i class="fas fa-medal"></i></a> </td>
                </tr>`;
        }).join('');
        $('#afficheModalAttestation #afficheModalAttestationForm table tbody').html(elements);
        $("#afficheModalAttestationLabel").html(titre);
        $('#afficheModalAttestation').modal('show');
      } else {
        $('#noAttestationHelp').html(`Il ya pas d'attestation correspondant à ce Numéro d'identification ${nin} .`);
        $('#afficheModalAttestation #afficheModalAttestationForm table tbody').html('');
      }


    },
    error: function (xx) {
      console.log(xx.responseJSON);
    }
  });


}

function populateArrnd(id, PIGOR_BASE_URL, isRegion, custumArrnd1, custumArrnd2, custumArrnd3, arrnd1, arrnd2, arrnd3) {
  $('#cacr').html("");
  $('#cacr2').html("");
  $('#cacr3').html("");

  $("#cacr").select2({
    language: "fr",
    theme: "bootstrap4",
    data: []
  });
  $("#cacr2").select2({
    language: "fr",
    theme: "bootstrap4",
    data: []
  });
  $("#cacr3").select2({
    language: "fr",
    theme: "bootstrap4",
    data: []
  });
  // Populate cav select2
  $.ajax({
    url: `${PIGOR_BASE_URL}/dept_arrnd/${id}`, // don't hard code your url's
    dataType: "json",
    method: "GET",
    success: function (cavList) {
      var data = [];
      console.log(cavList)

      // let first_id = $('#shop-id option:eq(1)').val();
      // $('#cav').val(first_id).trigger('change.select2');
     
      cavList.forEach(s => {
        data.push({
          id: s.id,
          text: s.nom
        });
      });

      $('#cacr').select2({
        language: "fr",
        theme: "bootstrap4",
        // placeholder: "Choisir un arrondissement",
        data: data
      });

      data.push({
        id: '',
        text: 'aucun choix'
      });


      $('#cacr2').select2({
        language: "fr",
        theme: "bootstrap4",
        // placeholder: "Choisir un arrondissement",
        data: data
      });

      $('#cacr3').select2({
        language: "fr",
        theme: "bootstrap4",
        // placeholder: "Choisir un arrondissement",
        data: data
      });

      if (isRegion == 1) {
        $('#cacr').val(custumArrnd1).trigger('change.select2');
        $('#cacr2').val(custumArrnd2).trigger('change.select2');
        $('#cacr3').val(custumArrnd3).trigger('change.select2');
      } else {
        $('#cacr').val(arrnd1).trigger('change.select2');
        $('#cacr2').val(arrnd2).trigger('change.select2');
        $('#cacr3').val(arrnd3).trigger('change.select2');
      }


    }
  });
}

function populateNetworkSkills(skills) {
  $("#reseauSysteme option").prop('selected', false);

  $("#reseauSysteme option").each(function(e){
    //console.log("value = ", $(this).val());
    if ($.inArray($(this).val(), skills) >= 0) {
        $(this).prop('selected', true);
    }
  })
}

// function populate_sgbd_skills(skills) {
//   $("#sgbd option").prop('selected', false);

//   $("#sgbd option").each(function(e){
//     //console.log("value = ", $(this).val());
//     if ($.inArray($(this).val(), skills) >= 0) {
//         $(this).prop('selected', true);
//     }
//   })
// }

