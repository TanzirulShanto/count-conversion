

/* 
1. texToAll;
2. denToAll;
3. neToAll;
4. nmToAll;
5. newToAll;
6. nesToAll;
7. nelToAll;
8. lbpsToAll;

*/
function texToAll(tex) {
    const den = tex*9;
    const ne = 590.5/tex;
    const new_ = 885.82677/tex;
    const nes = 1937.746063/tex;
    const lbps = tex/34.4484;
    const nel = 1653.543307/tex;
    const nm = 1000/tex;

    const obj = {
        fromSys: "Tex",
        fromCount: tex,
        data: {
            "Denier": den,
            "English Count": ne,
            "Worsted Count": new_,
            "Woollen Count": nes,
            "Jute Count": lbps,
            "Linen Count": nel,
            "Metric Count": nm
        }
    }
    return obj;
}


function denToAll(den) {
    const tex = den/9;
    const ne = 5314.5/den;
    const new_ = 7972.44093/den;
    const nes = 17439.71457/den;
    const lbps = den/310.0356;
    const nel = 14881.88976/den;
    const nm = 9000/den;

    const obj = {
        fromSys: "Denier",
        fromCount: den,
        data: {
            "Tex": tex,
            "English Count": ne,
            "Worsted Count": new_,
            "Woollen Count": nes,
            "Jute Count": lbps,
            "Linen Count": nel,
            "Metric Count": nm
        }
    }
    return obj;
}



function neToAll(ne) {
    const tex = 590.5/ne;
    const den = 5314.96063/ne;
    const new_ = 1.5*ne;
    const nes = 3.28125*ne;
    const lbps = 17.14285714/ne;
    const nel = 2.8*ne;
    const nm = ne/0.59;

    const obj = {
        fromSys: "English Count",
        fromCount: ne,
        data: {
            "Tex": tex,
            "Denier": den,
            "Worsted Count": new_,
            "Woollen Count": nes,
            "Jute Count": lbps,
            "Linen Count": nel,
            "Metric Count": nm
        }
    }
    return obj;
}

function nmToAll(nm) {
    const tex = 1000/nm;
    const den = 9000/nm;
    const ne = 0.59*nm;
    const new_ = nm/1.12888889;
    const nes = nm/0.5160634921;
    const lbps = 29.02911519/nm;
    const nel = nm/0.6047619;

    const obj = {
        fromSys: "Metric Count",
        fromCount: nm,
        data: {
            "Tex": tex,
            "Denier": den,
            "English Count": ne,
            "Worsted Count": new_,
            "Woollen Count": nes,
            "Jute Count": lbps,
            "Linen Count": nel,
        }
    }
    return obj;
}


function newToAll(new_) {
    const tex = 885.82677/new_;
    const den = 7972.44093/new_;
    const ne = new_/1.5;
    const nm = 1.1288889*new_;
    const nes = 2.1875*new_;
    const lbps = 25.71428571/new_;
    const nel = 1.866667*new_;

    const obj = {
        fromSys: "Worsted Count",
        fromCount: new_,
        data: {
            "Tex": tex,
            "Denier": den,
            "English Count": ne,
            "Metric Count": nm,
            "Woollen Count": nes,
            "Jute Count": lbps,
            "Linen Count": nel,
        }
    }
    return obj;
}


function nesToAll(nes) {
    const tex = 1937.746063/nes;
    const den = 17439.71457/nes;
    const ne = nes/3.28175;
    const nm = nes*0.5160634921;
    const new_ = nes/2.1875;
    const lbps = 56.25/nes;
    const nel = 0.853333*nes;

    const obj = {
        fromSys: "Woollen Count",
        fromCount: nes,
        data: {
            "Tex": tex,
            "Denier": den,
            "English Count": ne,
            "Metric Count": nm,
            "Worsted Count": new_,
            "Jute Count": lbps,
            "Linen Count": nel,
        }
    }
    return obj;
}


function lbpsToAll(lbps) {
    const tex = 34.4484*lbps;
    const den = 310.0356*lbps;
    const ne = 17.14285714/lbps;
    const nm = 29.02911519/lbps;
    const new_ = 25.71428571/lbps;
    const nes = 56.25/lbps;
    const nel = 48/lbps;

    const obj = {
        fromSys: "Jute Count",
        fromCount: lbps,
        data: {
            "Tex": tex,
            "Denier": den,
            "English Count": ne,
            "Metric Count": nm,
            "Worsted Count": new_,
            "Wollen Count": nes,
            "Linen Count": nel,
        }
    }
    return obj;
}



function nelToAll(nel) {
    const tex = 1653.543307/nel;
    const den = 14881.88976/nel;
    const ne = nel/2.8;
    const nm = 0.6047619*nel;
    const new_ = nel/1.866667;
    const nes = nel/0.8533333;
    const lbps = 48/nel;

    const obj = {
        fromSys: "Linen Count",
        fromCount: nel,
        data: {
            "Tex": tex,
            "Denier": den,
            "English Count": ne,
            "Metric Count": nm,
            "Worsted Count": new_,
            "Wollen Count": nes,
            "Jute Count": lbps,
        }
    }
    return obj;
}



exports.texToAll = texToAll;
exports.denToAll = denToAll;
exports.neToAll = neToAll;
exports.nmToAll = nmToAll;
exports.newToAll = newToAll;
exports.nesToAll = nesToAll;
exports.nelToAll = nelToAll;
exports.lbpsToAll = lbpsToAll;