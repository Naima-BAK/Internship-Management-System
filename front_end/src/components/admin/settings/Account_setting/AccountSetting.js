import React from 'react'
import { BsTrash2Fill } from 'react-icons/bs'
import DeleteAccount from './DeleteAccount'

export default function AccountSetting() {
    const style = {

        fontFamily: 'Bangers, cursive',
        fontWeight: 'bold',
        fontSize: '18px'
    }
    return (
        <div className="tab-pane" id="account">
            <h6 style={style}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="orange" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                </svg>
                Paramètres du compte
            </h6>
            <hr />
            <form>
                <div className="form-group">
                    <label htmlFor="username">{localStorage.getItem('auth_name')}
                    </label>
                    <label htmlFor="username">{localStorage.getItem('auth_email')}
                    </label>


                </div>
                <hr />

                <div className="form-group">
                    <label className="d-block text-danger" style={{
                        color: '#b22222', fontFamily: 'Bangers, cursive',
                        fontWeight: 'bold',
                    }}>
                        Supprimer le compte
                    </label>
                    <p className="text-muted font-size-sm">Une fois que vous avez supprimé votre compte, il n'y a pas de retour en arrière possible
                    </p>
                </div>

                <DeleteAccount />
            </form>
        </div>
    )
}