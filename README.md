🚀 Roadmap to "Functional System"
Backend Integration (Auth Service):

Ngayon, sa Login.tsx, kailangan na nating i-connect ang handleSubmit sa iyong /auth/login endpoint sa backend.

Dito mo rin iha-handle ang pag-save ng JWT Token sa localStorage para "matandaan" ng browser na naka-login ang user.

Protected Routes (Middleware):

Kailangan nating siguraduhin na ang mga Protected Pages (halimbawa: Booking.tsx o MedicalRecords.tsx) ay hindi mapupuntahan ng mga users na hindi pa naka-login. Gagamit tayo ng PrivateRouter wrapper dito.

Admin & Staff Flow:

Since tapos na ang Pasyente, susunod natin ang pag-set up ng Admin Dashboard kung saan ka mag-a-add ng staff/dentist (the "Invitation" approach).

Dito rin natin isasama 'yung qrcode generation para sa QR Login nila.

Ano ang gusto mong unahin natin ngayon?

A. I-connect na natin ang Login.tsx sa iyong backend API (JWT Handling)?

B. Gumawa na tayo ng ProtectedRoute component para hindi makapasok ang mga hindi rehistradong user?

C. Mag-proceed na tayo sa Admin Dashboard para makapag-add ka na ng Staff/Dentist?