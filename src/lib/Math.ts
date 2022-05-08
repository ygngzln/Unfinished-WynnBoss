let copy;
let crit: number;
let minDmg: number;
let maxDmg: number;
let minn: number;
let mine: number;
let mint: number;
let minw: number;
let minf: number;
let mina: number;
let maxn: number;
let maxe: number;
let maxt: number;
let maxw: number;
let maxf: number;
let maxa: number;
let temp: Array<any>;
let damagesArr: Array<Array<number>>;
let stealChance: number;
let manaSteal: number;
let lifeSteal: number;

export function dataSetup(stats: any){
    copy = {...stats}
    copy.str = skill(stats.str)
    copy.dex = skill(stats.dex)
    copy.intel = skill(stats.intel)
    copy.def = skill(stats.def)
    copy.agi = skill(stats.agi)
    stealChance = stealChanceFunction(speed(copy.speed))
    damagesArr = calculateMinMax(copy)
    minDmg = damagesArr[0].reduce((m,v,i) => {
        return m+v;
    },0)
    maxDmg = damagesArr[1].reduce((m,v,i) => {
        return m+v;
    },0)
    if(maxDmg == 0){
        return 0;
    }
    return 1;
}

export function calculate(){
    return Math.round(Math.random()*(maxDmg-minDmg) + minDmg);
}

export function poisonCalc(x: number){
    return Math.round(x*(1+copy.str))
}

export function steals(){
    manaSteal = (Math.random()*1000)/10
    lifeSteal = (Math.random()*1000)/10
    if(lifeSteal < stealChance && manaSteal < stealChance){
        return 3
    }else if(lifeSteal < stealChance && !(manaSteal < stealChance)){
        return 1
    }else if(manaSteal < stealChance && !(lifeSteal < stealChance)){
        return 2
    }else{
        return 0
    }
}

export function powderTime(){
    switch (copy.speed.toLowerCase().replace("/_|-/g", " ").trim()) {
        case "super slow":
            return 6;
        case "very slow":
            return 6;
        default:
            return 5;
    }
}

function stealChanceFunction(x: number){
    switch (x) {
        case 0.51:
            return 49
        case 0.83:
            return 30.1
        case 1.5:
            return 16.6
        case 2.05:
            return 12.2
        case 2.5:
            return 10
        case 3.1:
            return 8.1
        case 4.3:
            return 5.8
    }
}

function calculateClassDefenses(x: string){
    switch (x){
        case "Assassin":
            break;
        case "Warrior":
            break;
        case "Mage":
            break;
        case "Archer":
            break;
        case "Shaman":
            break;
    }
}

function bossStun(spellUsed: string, immune: boolean){
    let effect:string;
    switch (spellUsed) {
        case 'Spin Attack':
            effect = "stun";
            break;
        case 'Vanish':
            effect = "blind"
            break;
        case 'Smoke Bomb':
            effect = "slow"
            break;
        case 'Uppercut':
            effect = "stuck"
            break;
        case 'Teleport':
            effect = "blind"
            break;
        case 'Ice Snake':
            effect = "stun"
            break;
        case 'Escape':
            effect = "blind"
            break;
        case 'Bomb Arrow':
            effect = "slow"
            break;
        case 'Aura':
            effect = "stuck"
            break;
    }
}

function bossEleDefs(x: string, y: number){
    switch (x) {
        case "Earth":
            break;
        case "Thunder":
            break;
        case "Water":
            break;
        case "Fire":
            break;
        case "Air":
            break;
    }
}

function calculateMinMax(damages){
    crit = willCrit(damages);
    [minn, mine, mint, minw, minf, mina, maxn, maxe, maxt, maxw, maxf, maxa] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    if(damages.ndmg != "0-0" && damages.ndmg.split("-").at(-1) != "0"){
        temp = damages.ndmg.split("-")
        minn = Math.round((parseInt(temp[0].trim())*crit*(1+damages.str)*(1+damages.melper/100)+(1+damages.str)*(crit*damages.melraw))*100)/100
        maxn = Math.round((parseInt(temp[1].trim())*crit*(1+damages.str)*(1+damages.melper/100)+(1+damages.str)*(crit*damages.melraw))*100)/100
    }
    if(damages.edmg != "0-0" && damages.edmg.split("-").at(-1) != "0"){
        temp = damages.edmg.split("-")
        mine = Math.round(parseInt(temp[0].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.eper/100)+(damages.str))*100)/100
        maxe = Math.round(parseInt(temp[1].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.eper/100)+(damages.str))*100)/100
    }
    if(damages.tdmg != "0-0" && damages.tdmg.split("-").at(-1) != "0"){
        temp =  damages.tdmg.split("-")
        mint = Math.round(parseInt(temp[0].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.tper/100)+(damages.dex))*100)/100
        maxt = Math.round(parseInt(temp[1].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.tper/100)+(damages.dex))*100)/100
    }
    if(damages.wdmg != "0-0" && damages.wdmg.split("-").at(-1) != "0"){
        temp =  damages.wdmg.split("-")
        minw = Math.round(parseInt(temp[0].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.wper/100)+(damages.intel))*100)/100
        maxw = Math.round(parseInt(temp[1].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.wper/100)+(damages.intel))*100)/100
    }
    if(damages.fdmg != "0-0" && damages.fdmg.split("-").at(-1) != "0"){
        temp =  damages.fdmg.split("-")
        minf = Math.round(parseInt(temp[0].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.fper/100)+(damages.def))*100)/100
        maxf = Math.round(parseInt(temp[1].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.fper/100)+(damages.def))*100)/100
    }
    if(damages.admg != "0-0" && damages.admg.split("-").at(-1) != "0"){
        temp =  damages.admg.split("-")
        mina = Math.round(parseInt(temp[0].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.aper/100)+(damages.agi))*100)/100
        maxa = Math.round(parseInt(temp[1].trim()) * crit*(1+damages.str)*(1+(damages.melper/100)+(damages.aper/100)+(damages.agi))*100)/100
    }
    return [[minn, mine, mint, minw, minf, mina],[maxn, maxe, maxt, maxw, maxf, maxa]];
}

function willCrit(stats){
    let crit:number = Math.round(Math.random()*1000)/10
    if(crit < stats.dex*100){
        return 2
    }else{
        return 1
    }
}

// function escape(currentHp:number, maxHp:number){

// }

function spellDmgs(){
    let moveDmg:boolean;
    switch(copy.playingClass){
        case "Assassin":
            break;
        case "Warrior":
            break;
        case "Mage":
            break;
        case "Archer":
            break;
        case "Shaman":
            break;
    }
}

function dodgeAttack(){
    let agiProc:number = Math.round(Math.random()*1000)/10
    if(agiProc < copy.agi){
        return true
    }
    return false
}

export function fail(){
    //[Action, Health Lost, Mana Lost]
    let spellMisclick:number = Math.round(Math.random()*1000)/10
    if(spellMisclick < 5.55){
        if(copy.cost2 < copy.cost3){
            return ["2",0,copy.cost2];
        }else{
            return ["3",0,copy.cost3];
        }
    }
    let missAim:number = Math.round(Math.random()*1000)/10
    if(copy.speed.toLowerCase() === "very slow"){
        if(missAim < 10){
            return ["Miss", 0, 0]
        }
    }
    return ["s", 0, 0]
}

export function speed(x: string){
    switch (x.toLowerCase().replace("/_|-/g", " ").trim()) {
        case "super slow":
            return 0.51;
        case "very slow":
            return 0.83;
        case "slow":
            return 1.5;
        case "normal":
            return 2.05;
        case "fast":
            return 2.5;
        case "very fast":
            return 3.1;
        case "super fast":
            return 4.3;
        default:
            return 2.05;
    }
}

function skill(x: number){
    if(x < 0 || x > 150){
        return 0.01;
    }
    switch (x){
        case 0.453:
            return "caught";
        case 0:
            return 0;
        case 1:
            return 0.01;
        case 2:
            return 0.02;
        case 3:
            return 0.029;
        case 4:
            return 0.039;
        case 5:
            return 0.049;
        case 6:
            return 0.058;
        case 7:
            return 0.067;
        case 8:
            return 0.077;
        case 9:
            return 0.086;
        case 10:
            return 0.095;
        case 11:
            return 0.104;
        case 12:
            return 0.113;
        case 13:
            return 0.122;
        case 14:
            return 0.131;
        case 15:
            return 0.139;
        case 16:
            return 0.148;
        case 17:
            return 0.157;
        case 18:
            return 0.165;
        case 19:
            return 0.173;
        case 20:
            return 0.182;
        case 21:
            return 0.19;
        case 22:
            return 0.198;
        case 23:
            return 0.206;
        case 24:
            return 0.214;
        case 25:
            return 0.222;
        case 26:
            return 0.23;
        case 27:
            return 0.238;
        case 28:
            return 0.246;
        case 29:
            return 0.253;
        case 30:
            return 0.261;
        case 31:
            return 0.268;
        case 32:
            return 0.276;
        case 33:
            return 0.283;
        case 34:
            return 0.29;
        case 35:
            return 0.298;
        case 36:
            return 0.305;
        case 37:
            return 0.312;
        case 38:
            return 0.319;
        case 39:
            return 0.326;
        case 40:
            return 0.333;
        case 41:
            return 0.34;
        case 42:
            return 0.346;
        case 43:
            return 0.353;
        case 44:
            return 0.36;
        case 45:
            return 0.366;
        case 46:
            return 0.373;
        case 47:
            return 0.379;
        case 48:
            return 0.386;
        case 49:
            return 0.392;
        case 50:
            return 0.399;
        case 51:
            return 0.405;
        case 52:
            return 0.411;
        case 53:
            return 0.417;
        case 54:
            return 0.423;
        case 55:
            return 0.429;
        case 56:
            return 0.435;
        case 57:
            return 0.441;
        case 58:
            return 0.447;
        case 59:
            return 0.453;
        case 60:
            return 0.458;
        case 61:
            return 0.464;
        case 62:
            return 0.47;
        case 63:
            return 0.475;
        case 64:
            return 0.481;
        case 65:
            return 0.486;
        case 66:
            return 0.492;
        case 67:
            return 0.497;
        case 68:
            return 0.503;
        case 69:
            return 0.508;
        case 70:
            return 0.513;
        case 71:
            return 0.518;
        case 72:
            return 0.523;
        case 73:
            return 0.528;
        case 74:
            return 0.534;
        case 75:
            return 0.539;
        case 76:
            return 0.543;
        case 77:
            return 0.548;
        case 78:
            return 0.553;
        case 79:
            return 0.558;
        case 80:
            return 0.563;
        case 81:
            return 0.568;
        case 82:
            return 0.572;
        case 83:
            return 0.577;
        case 84:
            return 0.581;
        case 85:
            return 0.586;
        case 86:
            return 0.591;
        case 87:
            return 0.595;
        case 88:
            return 0.599;
        case 89:
            return 0.604;
        case 90:
            return 0.608;
        case 91:
            return 0.613;
        case 92:
            return 0.617;
        case 93:
            return 0.621;
        case 94:
            return 0.625;
        case 95:
            return 0.629;
        case 96:
            return 0.633;
        case 97:
            return 0.638;
        case 98:
            return 0.642;
        case 99:
            return 0.646;
        case 100:
            return 0.65;
        case 101:
            return 0.654;
        case 102:
            return 0.657;
        case 103:
            return 0.661;
        case 104:
            return 0.665;
        case 105:
            return 0.669;
        case 106:
            return 0.673;
        case 107:
            return 0.676;
        case 108:
            return 0.68;
        case 109:
            return 0.684;
        case 110:
            return 0.687;
        case 111:
            return 0.691;
        case 112:
            return 0.694;
        case 113:
            return 0.698;
        case 114:
            return 0.701;
        case 115:
            return 0.705;
        case 116:
            return 0.708;
        case 117:
            return 0.712;
        case 118:
            return 0.715;
        case 119:
            return 0.718;
        case 120:
            return 0.722;
        case 121:
            return 0.725;
        case 122:
            return 0.728;
        case 123:
            return 0.731;
        case 124:
            return 0.735;
        case 125:
            return 0.738;
        case 126:
            return 0.741;
        case 127:
            return 0.744;
        case 128:
            return 0.747;
        case 129:
            return 0.75;
        case 130:
            return 0.753;
        case 131:
            return 0.756;
        case 132:
            return 0.759;
        case 133:
            return 0.762;
        case 134:
            return 0.765;
        case 135:
            return 0.768;
        case 136:
            return 0.771;
        case 137:
            return 0.773;
        case 138:
            return 0.776;
        case 139:
            return 0.779;
        case 140:
            return 0.782;
        case 141:
            return 0.784;
        case 142:
            return 0.787;
        case 143:
            return 0.79;
        case 144:
            return 0.792;
        case 145:
            return 0.795;
        case 146:
            return 0.798;
        case 147:
            return 0.8;
        case 148:
            return 0.803;
        case 149:
            return 0.805;
        case 150:
            return 0.808;
    }
}

