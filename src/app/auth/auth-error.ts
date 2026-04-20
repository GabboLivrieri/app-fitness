import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthErrorService {

  private firebaseErrors: Record<string, { title: string; message: string }> = {

   // SIGNUP
    EMAIL_EXISTS: {
        title: 'Email già in uso',
        message: 'Esiste già un account associato a questa email.'
    },
    INVALID_EMAIL: {
        title: 'Email non valida',
        message: "L'indirizzo email inserito non è valido."
    },
    WEAK_PASSWORD: {
        title: 'Password debole',
        message: 'La password deve contenere almeno 6 caratteri.'
    },

    // LOGIN
    INVALID_LOGIN_CREDENTIALS: {
        title: 'Credenziali non valide',
        message: 'Email o password non corrette.'
    },
    USER_DISABLED: {
        title: 'Utente disabilitato',
        message: 'Questo account è stato disabilitato.'
    },
    'too-many-requests': {
        title: 'Troppi tentativi',
        message: 'Troppi tentativi di accesso falliti. Riprova più tardi.'
    }
  };

  getError(err: any) {
    const fallback = {
      title: 'Errore di autenticazione',
      message: 'Si è verificato un errore imprevisto. Riprova.'
    };

    const raw =
    err?.error?.error?.message || err?.error?.message || '';

    const code = raw.split(':')[0].replace('auth/', '').trim().toUppercase().replace(/-/g, '_');

    return this.firebaseErrors[code] ?? fallback;
  }
}