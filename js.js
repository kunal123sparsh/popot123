function notifyMe(message, status, progress) {
          if (!("Notification" in window)) {
              alert("This browser does not support desktop notification");
          }else if (Notification.permission === "granted") {
              var options = {
                  body: message,
             icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Checkmark.svg/200px-Checkmark.svg.png",
                  dir: "auto"
              };
              var notification = new Notification("Adamovich " + status, options);
          }else if (Notification.permission !== 'denied') {
              Notification.requestPermission(function(permission) {
                  if (!('permission' in Notification)) {
                      Notification.permission = permission;
                  }
                  if (permission === "granted") {
                      var options = {
                          body: progress,
                              icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Checkmark.svg/200px-Checkmark.svg.png",
                          dir: "auto"
                      };
                  var notification = new Notification("Adamovich " + status, options);
                  }
              });
          }

      }


      function cleanInput() {
          var lista = $('#lista').val();
          if (lista.length == 0) {
              document.getElementById("demo").innerHTML = 'Fill in some CCs before trying to clean!';
              return;
          } else {
              document.getElementById("lista").value = '';
              document.getElementById("demo").innerHTML = 'Cleaned the CC-Input.';
          }
      }

      function rmLinha(id) {
          var lines = $(id).val().split('\n');
          lines.splice(0, 1);
          $(id).val(lines.join("\n"));
      }

       function play(){
             audio = document.getElementById('audio');
             audio.load();
             audio.play();
    }
      function start() {
          var lista = $('#lista').val();
          if (lista.length == 0) {
              document.getElementById("demo").innerHTML = 'Enter some CCs!';
              return;
          } else {
              document.getElementById("demo").innerHTML = 'Starting...';
          }
          var i;
          var lista = $('#lista').val();
          var cc = lista.split("\n");
          var separador = $('#separador').val();

          for (i = 0; i < cc.length; i++) {
              var cc2 = cc[i];
              var id = i;
              check(cc2, separador, id);

        }
      function stop() {
              document.getElementById("demo").innerHTML = 'Stopped!';
          }

          //document.getElementById("pgstr").style.display = "block";
          var textarea = document.getElementById("lista").value;
          // var textareacount = textarea.split("\n");
          var textareacount = textarea.split('\n');
          var textareaMatch = count(textareacount, 'COUNT_RECURSIVE');
          //Check
          var myString = textarea;
          var myArray = listToArray(myString, '\n');

          //document.getElementById("demo").innerHTML = '';
          document.getElementById("carregada").innerHTML = textareaMatch;
          for (var i = 0; i < textareaMatch; i++) {

              var cclst = myArray[i];
              var cemail = cclst.split("|");
              var csids = 'csid_' + i;
              var ccids = 'ccid_' + i;

              var output = document.getElementById("lista").value;
              output = output.replace(cclst, "");
              output = output.replace("\n", "");
              document.getElementById("lista").innerHTML = output;
          }



      }

      function check(cc2, separador, id) {
                    var xmlhttp;
                        xmlhttp=new XMLHttpRequest();
                    xmlhttp.onreadystatechange = function()
                    {
                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
                        {
                          var xdata = xmlhttp.responseText;

                        if (xdata.match("#LIVE")) {
                          document.getElementById("demo").innerHTML = '#LIVE';
                          document.getElementById("testado").innerHTML = (eval(document.getElementById("testado").innerHTML) + 1);
                          document.getElementById("CLIVE").innerHTML = (eval(document.getElementById("CLIVE").innerHTML) + 1);
                          document.getElementById("aprovada_conta").innerHTML = (eval(document.getElementById("aprovada_conta").innerHTML) + 1);
                          $("#aprovadasapp").append(xdata);
                          rmLinha('#lista');
                          console.log('{"Success":"', document.getElementById("testado").innerHTML, '":"true"}')

                      } else if (xdata.match("#CCN")) {
                        document.getElementById("demo").innerHTML = '#CCN';
                        document.getElementById("testado").innerHTML = (eval(document.getElementById("testado").innerHTML) + 1);
                        document.getElementById("CCN").innerHTML = (eval(document.getElementById("CCN").innerHTML) + 1);
                        document.getElementById("ccn_conta").innerHTML = (eval(document.getElementById("ccn_conta").innerHTML) + 1);
                        $("#ccnapp").append(xdata);
                        rmLinha('#lista');
                        console.log('{"Success":"', document.getElementById("testado").innerHTML, '":"true"}')

                    } else if (xdata.match("#DEDPROX")) {
                          document.getElementById("demo").innerHTML = '#DEDPROX';
                          start();
                      } else {
                        document.getElementById("demo").innerHTML = '#DEAD';
                        document.getElementById("testado").innerHTML = (eval(document.getElementById("testado").innerHTML) + 1);
                        document.getElementById("CDIE").innerHTML = (eval(document.getElementById("CDIE").innerHTML) + 1);
                        document.getElementById("reprovada_conta").innerHTML = (eval(document.getElementById("reprovada_conta").innerHTML) + 1);
                        $("#reprovadasapp").append(xdata);
                        rmLinha('#lista');
                        console.log('{"Success":"', document.getElementById("testado").innerHTML, '":"false"}')
                           }
                         }
                      }
                    xmlhttp.open("GET","api.php?lista=" + cc2,true);
                    xmlhttp.send();
      }

      function SelectAll(id) {
          document.getElementById(id).focus();
          document.getElementById(id).select();
      }


      function listToArray(fullString, separator) {
          var fullArray = [];

          if (fullString !== undefined) {
              if (fullString.indexOf(separator) == -1) {
                  fullArray.push(fullString);
              } else {
                  fullArray = fullString.split(separator);
              }
          }

          return fullArray;
      }

      function count(mixed_var, mode) {
          var key, cnt = 0;
          if (mixed_var === null || typeof mixed_var === 'undefined') {
              return 0;
          } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
              return 1;
          }
          if (mode === 'COUNT_RECURSIVE') {
              mode = 1;
          }
          if (mode != 1) {
              mode = 0;
          }
          for (key in mixed_var) {
              if (mixed_var.hasOwnProperty(key)) {
                  cnt++;
                  if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
                          Object)) {
                      cnt += this.count(mixed_var[key], 1);
                  }
              }
          }
          return cnt;
      }

      function pushcsB(c, p) {
          document.getElementById(p).innerHTML = document.getElementById(p).innerHTML + c + "\n<br>";
      }
