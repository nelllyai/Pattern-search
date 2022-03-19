class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function f(p) { // функция Розенброка
    return 100 * Math.pow( ( Math.pow(p.x, 2) - p.y ), 2) + Math.pow( (1 - p.x), 2 );
}

let e = 0.01,
    d1 = 2.2,
    d2 = 1,
    a = 2,
    h = 1;


// начальная точка
let Xfirst = new Point(-1.2, 1);

let list = document.querySelector("ul");

list.children[0].innerHTML += `(${Xfirst.x}, ${Xfirst.y})`;
list.children[1].innerHTML += d1;
list.children[2].innerHTML += d2;
list.children[3].innerHTML += e;
list.children[4].innerHTML += a;
list.children[5].innerHTML += h;

hooke_jeeves(f, Xfirst, d1, d2, e, a, h);

function hooke_jeeves(f, X0, delta1, delta2, eps, alpha, L) {
    let area = document.querySelector("textarea");
    area.innerHTML = `Начало работы алгоритма\n\n`;

    let final = false;
    let k = 1;

    do {
        area.innerHTML += `${k}.`;
        area.innerHTML += ` Q(${X0.x.toFixed(3)}, ${X0.y.toFixed(3)}) = ${f(X0).toFixed(3)}\n`;
        area.innerHTML += `     &#948;1 = ${delta1.toFixed(3)} &#948;2 = ${delta2.toFixed(3)}\n`;

        let check = false;

        let T = new Point(X0.x, X0.y);
        let T1, T2;

        let Tx = new Point(T.x + delta1, T.y);

        if (f(Tx) < f(T)) {
            T1 = new Point(Tx.x, Tx.y);
        }
        
        else {
            let Txx = new Point(T.x - delta1, T.y);
            if (f(Txx) < f(T)) {
                T1 = new Point(Txx.x, Txx.y);
            }
            else {
                T1 = new Point(T.x, T.y);
            }

            check = true;
        }

        let Ty = new Point(T1.x, T1.y + delta2);

        if (f(Ty) < f(T)) {
            T2 = new Point(Ty.x, Ty.y);
        }
        
        else {
            let Tyy = new Point(T1.x, T1.y - delta2);

            if (f(Tyy) < f(T1)) {
                T2 = new Point(Tyy.x, Tyy.y);
            }
            else {
                T2 = new Point(T1.x, T1.y);
            }

            check = true;
        }

        Xnew = new Point( X0.x + L * (T1.x - T.x), X0.y + L * (T1.y - T.y) );

        if (f(Xnew) < f(T2)) {
            X0 = Xnew;
        }
        else {
            X0 = T2;
        }

        if (check) {
            final = Math.sqrt(Math.pow(delta1, 2) + Math.pow(delta2, 2)) < eps ? !final : final;
            delta1 /= alpha;
            delta2 /= alpha;
            check = false;
        }

        k++;
    } while(!final);

    area.innerHTML += `\nКонец работы алгоритма\nОтвет:`;
    area.innerHTML += `\nX* = (${X0.x.toFixed(3)}, ${X0.y.toFixed(3)})`;
    area.innerHTML += `\nQ(X*) = ${f(X0).toFixed(3)}`;
}