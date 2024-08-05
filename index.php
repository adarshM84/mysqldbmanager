<!doctype html>
<html lang="en">
<?php
require 'header.php';
?>

<body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <div class="modal modal-signin position-static d-block py-1" style='height: 100vh;' tabindex="-1" role="dialog" id="modalSignin">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-5 shadow" style='background: #1A2226;'>
                <div class="modal-header p-5 pb-4 border-bottom-0">
                    <h2 class="fw-bold mb-0 text-center" style="color: #0DB8DE !important;">Temporary Login</h2>
                </div>

                <div class="modal-body p-5 pt-0">

                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control  inputStyle bordeRradius5" id="hostName" placeholder="Host Name Of Database">
                            <label for="hostName" class='text-white'>Host Name</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control  inputStyle bordeRradius5" id="userName" placeholder="User Name Of Database">
                            <label for="userName" class='text-white'>User Name</label>
                        </div>
                    </div>
                    <div class="col-12">
                            <div class="form-floating mb-3">
                                <input type="pasword" class="form-control  inputStyle bordeRradius5" id="dbPassWord" placeholder="Password Of Database">
                                <label for="dbPassWord" class='text-white'>Database Password</label>
                            </div>
                        </div>

                  
                    <div class="row">
                        <div class="col-mb-12">
                            <p class="error text-danger" id="error">

                            </p>
                            <p class="text-success success" id="success">

                            </p>
                        </div>
                    </div>
                    <button class="w-100 mb-2 btn btn-lg rounded-4 checkButton" id="tempLogin" onclick="checkTempLogin()" type="submit">Check Credential</button>
                    <audio id="audio" src="music/loginMusic.mp3" hidden></audio>
                    <hr class="my-3">
                    <h5 class="text-center text-white">All Rights Reserved At <a href='#'>Adarsh Mishra</a> </h5>
                </div>
            </div>
        </div>
    </div>
</body>
<script>
    $(document).ready(function() {
        document.getElementById('loadingMessage').hidden = true;
    });
</script>

</html>