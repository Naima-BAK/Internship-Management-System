import React from 'react'

export default function testshow() {
    return (


        <div class="container mt-3">
            <h2>Modifer les information de l'entreprise</h2>
            <form>


                {/* -------name  &&  email-------------- */}
                <div class="row">

                    <div class="col">
                        <div class="col-xs-2">
                            <label class="col-md-4 control-label" >Nom de l'entreprise</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>

                    <div class="col">
                        <div class="col-xs-2">
                            <label class="col-md-4 control-label" >email de l'entreprise</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">

                    <div class="col">
                        <div class="col-xs-2">
                            <label class="col-md-4 control-label" >Activité de l'entreprise</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>

                    <div class="col">
                        <div class="col-xs-2">
                            <label class="col-md-4 control-label" >Télephone</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>
                </div>
                <br />
                {/* --------adresse - ville  - pays---------- */}
                <div class="row">

                    <div class="col">
                        <div class="col-xs-3">
                            <label class="col-md-4 control-label" >Rue</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>

                    <div class="col">
                        <div class="col-xs-3">
                            <label class="col-md-4 control-label" >Ville</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>
                    <div class="col">
                        <div class="col-xs-3">
                            <label class="col-md-4 control-label" >Pays</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>
                </div>
                <br />
                <div class="row">

                    <div class="col">
                        <div class="col-xs-2">
                            <label class="col-md-4 control-label" >site web</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>

                    <div class="col">
                        <div class="col-xs-2">
                            <label class="col-md-4 control-label" >Logo</label>
                            <input type="text" class="form-control input-lg" placeholder="Enter email" name="email" style={{ flex: '0 1 200px' }} />
                        </div>
                    </div>
                </div>
                <br />
            </form>
        </div>



    )
}
