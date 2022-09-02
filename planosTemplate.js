var formTemplate2 = `  <div class="card mt-2" style="margin-bottom: 10px;" name="materiales2">
<div class="card-body">
    <i id="menos2" class="bi bi-x-lg btn-danger btn-circle float-right"></i>
    <br>
    <label for="linkInmagen">Link Imagen:</label>
    <input class="form-control mb-3" type="text" name="descripcion" required>

    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i
                            class="inmuPrecio"
                            style="height: 35px; width: 35px;"></i></span> </span>
                </div>
                <input style="height: auto;" class="form-control col" type="text" name="precio"
                placeholder="Desde $00,000,000" required>
            </div>                                            
        </div>
        <div class="col">

        </div>
    </div>
    <div class="row">
        <div class="col">                                            
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i
                                class="inmuEstacionamiento"
                                style="height: 35px; width: 35px;"></i></span> </span>
                    </div>
                    <input  style="height: auto;" class="form-control col-6" type="number" name="estacionamiento"
                    required>
                </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i
                            class="inmuHabitaciones"
                            style="height: 35px; width: 35px;"></i></span> </span>
                </div>
                <input style="height: auto;" class="form-control col-6" type="number"
                    name="habitaciones" required>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i
                            class="inmuBaños"
                            style="height: 35px; width: 35px;"></i></span> </span>
                </div>
                <input style="height: auto;" class="form-control col-6" type="number"
                    name="baños" required>
            </div>
        </div>
        <div class="col">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1"><i
                            class="inmuMetros"
                            style="height: 35px; width: 35px;"></i></span> </span>
                </div>
                <input style="height: auto;" class="form-control col-6" type="number"
                    name="metros" required>
            </div>
        </div>
    </div>


</div>
</div> `