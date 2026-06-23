import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, LogIn, UserPlus, Star, Flame, ChevronLeft, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { RegionModal } from './components/RegionModal';
import { Logo } from './components/Logo';
import { InvoiceModal } from './components/InvoiceModal';
import OrderConfirmationModal from './components/OrderConfirmationModal';
import { auth, db, handleFirestoreError, OperationType } from './lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const instant1DetikPackages = [
  { name: "3 (3+0) Diamonds", price: 1199, oldPrice: 1288, label: "Sisa 7%" },
  { name: "5 (5+0) Diamonds", price: 1450, oldPrice: 1558, label: "Sisa 7%" },
  { name: "11 (10+1) Diamonds", price: 2883, oldPrice: null, label: null },
  { name: "14 (13+1) Diamonds", price: 4070, oldPrice: 4500, label: "Sisa 9%" },
  { name: "17 (15+2) Diamonds", price: 4880, oldPrice: 6000, label: "Sisa 19%" },
  { name: "19 (17+2) Diamonds", price: 5765, oldPrice: null, label: null },
  { name: "25 (22+3) Diamonds", price: 7160, oldPrice: 8000, label: "Sisa 11%" },
  { name: "28 (25+3) Diamonds", price: 8020, oldPrice: 9000, label: "Sisa 11%" },
  { name: "34 (30+4) Diamonds", price: 8599, oldPrice: 11550, label: "Sisa 26%" },
  { name: "36 (32+4) Diamonds", price: 10170, oldPrice: 12000, label: "Sisa 15%" },
  { name: "42 (38+4) Diamonds", price: 12060, oldPrice: 13500, label: "Sisa 11%" },
  { name: "44 (40+4) Diamonds", price: 12842, oldPrice: 15000, label: "Sisa 14%" },
  { name: "55 (50+5) Diamonds", price: 14612, oldPrice: 15000, label: "Sisa 3%" },
  { name: "56 (51+5) Diamonds", price: 15014, oldPrice: 16500, label: "Sisa 9%" },
  { name: "59 (54+5) Diamonds", price: 16050, oldPrice: 18000, label: "Sisa 11%" },
  { name: "66 (60+6) Diamonds", price: 17560, oldPrice: 19500, label: "Sisa 10%" },
  { name: "74 (67+7) Diamonds", price: 20340, oldPrice: 22500, label: "Sisa 10%" },
  { name: "77 (70+7) Diamonds", price: 20580, oldPrice: 24000, label: "Sisa 14%" },
  { name: "85 (77+8) Diamonds", price: 22281, oldPrice: 25500, label: "Sisa 13%" },
  { name: "86 (78+8) Diamonds", price: 22305, oldPrice: 25500, label: "Sisa 13%" },
  { name: "88 (80+8) Diamonds", price: 23600, oldPrice: 27000, label: "Sisa 13%" },
  { name: "92 (84+8) Diamonds", price: 24630, oldPrice: 28500, label: "Sisa 14%" },
  { name: "96 (88+8) Diamonds", price: 26150, oldPrice: 28500, label: "Sisa 8%" },
  { name: "100 (91+9) Diamonds", price: 27600, oldPrice: 30000, label: "Sisa 8%" },
  { name: "112 (102+10) Diamonds", price: 28823, oldPrice: 33000, label: "Sisa 13%" },
  { name: "116 (106+10) Diamonds", price: 32050, oldPrice: 34500, label: "Sisa 7%" },
  { name: "117 (106+11) Diamonds", price: 32220, oldPrice: 34500, label: "Sisa 7%" },
  { name: "129 (118+11) Diamonds", price: 35110, oldPrice: 39000, label: "Sisa 10%" },
  { name: "144 (130+14) Diamonds", price: 38650, oldPrice: 43500, label: "Sisa 11%" },
  { name: "148 (134+14) Diamonds", price: 41600, oldPrice: 45000, label: "Sisa 8%" },
  { name: "160 (146+14) Diamonds", price: 43235, oldPrice: 48000, label: "Sisa 10%" },
  { name: "172 (156+16) Diamonds", price: 46039, oldPrice: 52500, label: "Sisa 12%" },
  { name: "180 (163+17) Diamonds", price: 47562, oldPrice: 51000, label: "Sisa 7%" },
  { name: "170 (154+16) Diamonds", price: 48150, oldPrice: 51000, label: "Sisa 6%" },
  { name: "176 (160+16) Diamonds", price: 48830, oldPrice: 52500, label: "Sisa 7%" },
  { name: "185 (169+16) Diamonds", price: 50050, oldPrice: 55500, label: "Sisa 10%" },
  { name: "200 (181+19) Diamonds", price: 56000, oldPrice: 60000, label: "Sisa 7%" },
  { name: "222 (200+22) Diamonds", price: 57646, oldPrice: 66000, label: "Sisa 13%" },
  { name: "222 (202+20) Diamonds", price: 60830, oldPrice: 66000, label: "Sisa 8%" },
  { name: "216 (196+20) Diamonds", price: 59867, oldPrice: 64500, label: "Sisa 7%" },
  { name: "240 (218+22) Diamonds", price: 65070, oldPrice: 72000, label: "Sisa 10%" },
  { name: "257 (234+23) Diamonds", price: 66404, oldPrice: 76500, label: "Sisa 13%" },
  { name: "277 (252+25) Diamonds", price: 72058, oldPrice: 76500, label: "Sisa 6%" },
  { name: "258 (234+24) Diamonds", price: 74875, oldPrice: 78000, label: "Sisa 4%" },
  { name: "284 (257+27) Diamonds", price: 77130, oldPrice: 85500, label: "Sisa 10%" },
  { name: "305 (276+29) Diamonds", price: 77822, oldPrice: 91500, label: "Sisa 15%" },
  { name: "296 (268+28) Diamonds", price: 81350, oldPrice: 88500, label: "Sisa 8%" },
  { name: "305 (277+28) Diamonds", price: 81160, oldPrice: 91500, label: "Sisa 11%" },
  { name: "306 (277+29) Diamonds", price: 83420, oldPrice: 91500, label: "Sisa 9%" },
  { name: "336 (305+31) Diamonds", price: 86469, oldPrice: 100500, label: "Sisa 14%" },
  { name: "344 (312+32) Diamonds", price: 88742, oldPrice: 103500, label: "Sisa 14%" },
  { name: "334 (304+30) Diamonds", price: 85351, oldPrice: 90000, label: "Sisa 5%" },
  { name: "345 (314+31) Diamonds", price: 88220, oldPrice: 103500, label: "Sisa 15%" },
  { name: "366 (332+34) Diamonds", price: 98440, oldPrice: 109500, label: "Sisa 10%" },
  { name: "379 (344+35) Diamonds", price: 102148, oldPrice: 112500, label: "Sisa 9%" },
  { name: "381 (346+35) Diamonds", price: 103760, oldPrice: 114000, label: "Sisa 9%" },
  { name: "402 (366+36) Diamonds", price: 103764, oldPrice: 120500, label: "Sisa 14%" },
  { name: "384 (349+35) Diamonds", price: 105780, oldPrice: 115500, label: "Sisa 8%" },
  { name: "408 (371+37) Diamonds", price: 110110, oldPrice: 121500, label: "Sisa 9%" },
  { name: "429 (390+39) Diamonds", price: 109997, oldPrice: 127500, label: "Sisa 14%" },
  { name: "396 (360+36) Diamonds", price: 106722, oldPrice: 118500, label: "Sisa 10%" },
  { name: "427 (388+39) Diamonds", price: 115290, oldPrice: 127500, label: "Sisa 10%" },
  { name: "448 (407+41) Diamonds", price: 115292, oldPrice: 133500, label: "Sisa 14%" },
  { name: "450 (409+41) Diamonds", price: 122208, oldPrice: 135000, label: "Sisa 9%" },
  { name: "480 (436+44) Diamonds", price: 130975, oldPrice: 144000, label: "Sisa 9%" },
  { name: "514 (467+47) Diamonds", price: 132808, oldPrice: 154500, label: "Sisa 14%" },
  { name: "429 (390+39) Diamonds", price: 128848, oldPrice: 138000, label: "Sisa 7%" },
  { name: "568 (516+52) Diamonds", price: 138840, oldPrice: 153000, label: "Sisa 9%" },
  { name: "522 (475+47) Diamonds", price: 141290, oldPrice: 156000, label: "Sisa 9%" },
  { name: "570 (518+52) Diamonds", price: 144115, oldPrice: 159000, label: "Sisa 9%" },
  { name: "560 (509+51) Diamonds", price: 150215, oldPrice: 162000, label: "Sisa 7%" },
  { name: "600 (546+54) Diamonds", price: 155069, oldPrice: 180000, label: "Sisa 14%" },
  { name: "626 (569+57) Diamonds", price: 158526, oldPrice: 171000, label: "Sisa 7%" },
  { name: "600 (545+55) Diamonds", price: 159100, oldPrice: 180000, label: "Sisa 12%" },
  { name: "649 (590+59) Diamonds", price: 172926, oldPrice: 189000, label: "Sisa 9%" },
  { name: "682 (620+62) Diamonds", price: 172927, oldPrice: 198000, label: "Sisa 13%" },
  { name: "706 (642+64) Diamonds", price: 176909, oldPrice: 198000, label: "Sisa 11%" },
  { name: "754 (686+68) Diamonds", price: 178701, oldPrice: 204000, label: "Sisa 12%" },
  { name: "758 (689+69) Diamonds", price: 187349, oldPrice: 213000, label: "Sisa 12%" },
  { name: "749 (681+68) Diamonds", price: 198232, oldPrice: 213000, label: "Sisa 7%" },
  { name: "717 (652+65) Diamonds", price: 190350, oldPrice: 213000, label: "Sisa 11%" },
  { name: "758 (689+69) Diamonds", price: 199870, oldPrice: 225000, label: "Sisa 11%" },
  { name: "785 (714+71) Diamonds", price: 201760, oldPrice: 231000, label: "Sisa 13%" },
  { name: "841 (764+77) Diamonds", price: 200554, oldPrice: 243000, label: "Sisa 17%" },
  { name: "790 (718+72) Diamonds", price: 211241, oldPrice: 237000, label: "Sisa 11%" },
  { name: "849 (772+77) Diamonds", price: 216172, oldPrice: 243000, label: "Sisa 11%" },
  { name: "878 (798+80) Diamonds", price: 229804, oldPrice: 255000, label: "Sisa 10%" },
  { name: "716 (651+65) Diamonds", price: 213443, oldPrice: 231000, label: "Sisa 8%" },
  { name: "875 (796+79) Diamonds", price: 230200, oldPrice: 255000, label: "Sisa 10%" },
  { name: "904 (822+82) Diamonds", price: 230583, oldPrice: 264000, label: "Sisa 13%" },
  { name: "961 (874+87) Diamonds", price: 241682, oldPrice: 279000, label: "Sisa 13%" },
  { name: "966 (878+88) Diamonds", price: 254290, oldPrice: 285000, label: "Sisa 11%" },
  { name: "977 (888+89) Diamonds", price: 257530, oldPrice: 294000, label: "Sisa 12%" },
  { name: "1010 (918+92) Diamonds", price: 259406, oldPrice: 294000, label: "Sisa 12%" },
  { name: "1050 (955+95) Diamonds", price: 265730, oldPrice: 300000, label: "Sisa 11%" },
  { name: "1141 (1037+104) Diamonds", price: 288229, oldPrice: 330000, label: "Sisa 13%" },
  { name: "1140 (1036+104) Diamonds", price: 306800, oldPrice: 318000, label: "Sisa 4%" },
  { name: "1220 (1109+111) Diamonds", price: 306796, oldPrice: 345000, label: "Sisa 11%" },
  { name: "1166 (1060+106) Diamonds", price: 313891, oldPrice: 345000, label: "Sisa 9%" },
  { name: "1182 (1075+107) Diamonds", price: 318943, oldPrice: 345000, label: "Sisa 8%" },
  { name: "1304 (1185+119) Diamonds", price: 339201, oldPrice: 375000, label: "Sisa 10%" },
  { name: "1295 (1177+118) Diamonds", price: 333160, oldPrice: 375000, label: "Sisa 11%" },
  { name: "1412 (1284+128) Diamonds", price: 353490, oldPrice: 405000, label: "Sisa 13%" },
  { name: "1368 (1243+125) Diamonds", price: 352569, oldPrice: 390000, label: "Sisa 10%" },
  { name: "1412 (1284+128) Diamonds", price: 381600, oldPrice: 405000, label: "Sisa 6%" },
  { name: "1443 (1312+131) Diamonds", price: 386650, oldPrice: 420000, label: "Sisa 8%" },
  { name: "1507 (1370+137) Diamonds", price: 406080, oldPrice: 450000, label: "Sisa 10%" },
  { name: "1556 (1414+142) Diamonds", price: 402417, oldPrice: 465000, label: "Sisa 13%" },
  { name: "1669 (1517+152) Diamonds", price: 420381, oldPrice: 480000, label: "Sisa 12%" },
  { name: "1732 (1574+158) Diamonds", price: 432343, oldPrice: 495000, label: "Sisa 13%" },
  { name: "1446 (1314+132) Diamonds", price: 421648, oldPrice: 450000, label: "Sisa 6%" },
  { name: "1672 (1520+152) Diamonds", price: 449886, oldPrice: 480000, label: "Sisa 6%" },
  { name: "1704 (1549+155) Diamonds", price: 451600, oldPrice: 495000, label: "Sisa 9%" },
  { name: "1760 (1600+160) Diamonds", price: 459060, oldPrice: 510000, label: "Sisa 10%" },
  { name: "1818 (1652+166) Diamonds", price: 502500, oldPrice: 540000, label: "Sisa 7%" },
  { name: "2194 (1994+200) Diamonds", price: 524494, oldPrice: 600000, label: "Sisa 13%" },
  { name: "1799 (1635+164) Diamonds", price: 523840, oldPrice: 540000, label: "Sisa 3%" },
  { name: "2146 (1950+196) Diamonds", price: 555580, oldPrice: 600000, label: "Sisa 7%" },
  { name: "2194 (1994+200) Diamonds", price: 561893, oldPrice: 600000, label: "Sisa 6%" },
  { name: "1986 (1805+181) Diamonds", price: 576458, oldPrice: 600000, label: "Sisa 4%" },
  { name: "2288 (2080+208) Diamonds", price: 602850, oldPrice: 660000, label: "Sisa 9%" },
  { name: "2282 (2074+208) Diamonds", price: 608140, oldPrice: 660000, label: "Sisa 8%" },
  { name: "2439 (2217+222) Diamonds", price: 612612, oldPrice: 690000, label: "Sisa 11%" },
  { name: "1760 (1600+160) Diamonds", price: 601847, oldPrice: 601847, label: null },
  { name: "2536 (2305+231) Diamonds", price: 644400, oldPrice: 690000, label: "Sisa 7%" },
  { name: "2519 (2290+229) Diamonds", price: 682100, oldPrice: 720000, label: "Sisa 5%" },
  { name: "2901 (2637+264) Diamonds", price: 780239, oldPrice: 840000, label: "Sisa 7%" },
  { name: "2680 (2436+244) Diamonds", price: 741750, oldPrice: 780000, label: "Sisa 5%" },
  { name: "2988 (2716+272) Diamonds", price: 749590, oldPrice: 840000, label: "Sisa 11%" },
  { name: "3541 (3219+322) Diamonds", price: 864686, oldPrice: 960000, label: "Sisa 10%" },
  { name: "3600 (3272+328) Diamonds", price: 881198, oldPrice: 990000, label: "Sisa 11%" },
  { name: "2916 (2650+266) Diamonds", price: 853726, oldPrice: 870000, label: "Sisa 2%" },
  { name: "3453 (3139+314) Diamonds", price: 895330, oldPrice: 1020000, label: "Sisa 12%" },
  { name: "3693 (3357+336) Diamonds", price: 961465, oldPrice: 1050000, label: "Sisa 8%" },
  { name: "4131 (3755+376) Diamonds", price: 1008800, oldPrice: 1140000, label: "Sisa 11%" },
  { name: "4030 (3663+367) Diamonds", price: 1010870, oldPrice: 1140000, label: "Sisa 11%" },
  { name: "3915 (3559+356) Diamonds", price: 1084263, oldPrice: 1140000, label: "Sisa 5%" },
  { name: "4294 (3903+391) Diamonds", price: 1058186, oldPrice: 1200000, label: "Sisa 12%" },
  { name: "4406 (4005+401) Diamonds", price: 1123150, oldPrice: 1230000, label: "Sisa 9%" },
  { name: "4870 (4427+443) Diamonds", price: 1194980, oldPrice: 1350000, label: "Sisa 11%" },
  { name: "4830 (4390+440) Diamonds", price: 1203600, oldPrice: 1350000, label: "Sisa 11%" },
  { name: "5132 (4665+467) Diamonds", price: 1239384, oldPrice: 1410000, label: "Sisa 12%" },
  { name: "5020 (4563+457) Diamonds", price: 1321704, oldPrice: 1410000, label: "Sisa 6%" },
  { name: "5372 (4883+489) Diamonds", price: 1352900, oldPrice: 1470000, label: "Sisa 8%" },
  { name: "5298 (4816+482) Diamonds", price: 1364420, oldPrice: 1470000, label: "Sisa 7%" },
  { name: "5560 (5054+506) Diamonds", price: 1399980, oldPrice: 1530000, label: "Sisa 8%" },
  { name: "6042 (5492+550) Diamonds", price: 1441142, oldPrice: 1650000, label: "Sisa 13%" },
  { name: "5940 (5400+540) Diamonds", price: 1495739, oldPrice: 1650000, label: "Sisa 9%" },
  { name: "6030 (5481+549) Diamonds", price: 1501830, oldPrice: 1650000, label: "Sisa 9%" },
  { name: "6238 (5670+568) Diamonds", price: 1497449, oldPrice: 1740000, label: "Sisa 14%" },
  { name: "6251 (5682+569) Diamonds", price: 1606400, oldPrice: 1740000, label: "Sisa 8%" },
  { name: "6848 (6225+623) Diamonds", price: 1701720, oldPrice: 1890000, label: "Sisa 10%" },
  { name: "7390 (6718+672) Diamonds", price: 1729370, oldPrice: 2010000, label: "Sisa 14%" },
  { name: "7156 (6505+651) Diamonds", price: 1817280, oldPrice: 1980000, label: "Sisa 8%" },
  { name: "6000 (5454+546) Diamonds", price: 1747857, oldPrice: 1747857, label: null },
  { name: "7727 (7024+703) Diamonds", price: 1846197, oldPrice: 2130000, label: "Sisa 13%" },
  { name: "7660 (6963+697) Diamonds", price: 1915832, oldPrice: 2100000, label: "Sisa 9%" },
  { name: "7723 (7020+703) Diamonds", price: 1968912, oldPrice: 2130000, label: "Sisa 8%" },
  { name: "8460 (7690+770) Diamonds", price: 2017599, oldPrice: 2310000, label: "Sisa 13%" },
  { name: "8040 (7309+731) Diamonds", price: 2025740, oldPrice: 2220000, label: "Sisa 9%" },
  { name: "8000 (7272+728) Diamonds", price: 2005905, oldPrice: 2005905, label: null },
  { name: "8302 (7547+755) Diamonds", price: 2082603, oldPrice: 2280000, label: "Sisa 9%" },
  { name: "9018 (8198+820) Diamonds", price: 2165715, oldPrice: 2460000, label: "Sisa 12%" },
  { name: "8858 (8052+806) Diamonds", price: 2202260, oldPrice: 2430000, label: "Sisa 9%" },
  { name: "9388 (8534+854) Diamonds", price: 2194796, oldPrice: 2550000, label: "Sisa 14%" },
  { name: "7962 (7238+724) Diamonds", price: 2130298, oldPrice: 2130298, label: null },
  { name: "9302 (8456+846) Diamonds", price: 2362234, oldPrice: 2550000, label: "Sisa 7%" },
  { name: "9560 (8690+870) Diamonds", price: 2396841, oldPrice: 2610000, label: "Sisa 8%" },
  { name: "9680 (8800+880) Diamonds", price: 2402280, oldPrice: 2640000, label: "Sisa 9%" },
  { name: "10175 (9250+925) Diamonds", price: 2464645, oldPrice: 2760000, label: "Sisa 11%" },
  { name: "10950 (9954+996) Diamonds", price: 2502720, oldPrice: 2970000, label: "Sisa 16%" },
  { name: "12806 (11641+1165) Diamonds", price: 2882283, oldPrice: 3450000, label: "Sisa 16%" },
  { name: "12060 (10963+1097) Diamonds", price: 2995888, oldPrice: 3300000, label: "Sisa 9%" },
  { name: "12916 (11741+1175) Diamonds", price: 3069803, oldPrice: 3540000, label: "Sisa 13%" },
  { name: "12912 (11738+1174) Diamonds", price: 3296032, oldPrice: 3540000, label: "Sisa 7%" },
  { name: "13680 (12436+1244) Diamonds", price: 3458735, oldPrice: 3750000, label: "Sisa 8%" },
  { name: "14100 (12818+1282) Diamonds", price: 3516500, oldPrice: 3870000, label: "Sisa 9%" },
  { name: "14832 (13483+1349) Diamonds", price: 3660854, oldPrice: 4050000, label: "Sisa 10%" },
  { name: "14800 (13454+1346) Diamonds", price: 3751490, oldPrice: 4050000, label: "Sisa 7%" },
  { name: "16060 (14600+1460) Diamonds", price: 4004364, oldPrice: 4410000, label: "Sisa 9%" },
  { name: "18170 (16518+1652) Diamonds", price: 4426650, oldPrice: 4950000, label: "Sisa 11%" },
  { name: "18160 (16509+1651) Diamonds", price: 4679513, oldPrice: 4950000, label: "Sisa 5%" },
  { name: "20820 (18927+1893) Diamonds", price: 4899881, oldPrice: 5670000, label: "Sisa 14%" },
  { name: "20180 (18345+1835) Diamonds", price: 5084450, oldPrice: 5490000, label: "Sisa 7%" },
  { name: "21320 (19381+1939) Diamonds", price: 5314500, oldPrice: 5820000, label: "Sisa 9%" },
  { name: "25884 (23530+2354) Diamonds", price: 6584388, oldPrice: 7080000, label: "Sisa 7%" },
  { name: "28980 (26345+2635) Diamonds", price: 7185000, oldPrice: 7920000, label: "Sisa 9%" }
];

const TOP_COUNTRIES = [
  { code: 'ID', dial: '+62', name: 'Indonesia' },
  { code: 'PH', dial: '+63', name: 'Philippines' },
  { code: 'MY', dial: '+60', name: 'Malaysia' },
  { code: 'MM', dial: '+95', name: 'Myanmar' },
  { code: 'SG', dial: '+65', name: 'Singapore' },
  { code: 'KH', dial: '+855', name: 'Cambodia' },
  { code: 'BR', dial: '+55', name: 'Brazil' },
  { code: 'US', dial: '+1', name: 'United States' },
  { code: 'TR', dial: '+90', name: 'Turkey' },
  { code: 'RU', dial: '+7', name: 'Russia' },
];

export default function MobileLegends() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'topup' | 'cek-transaksi'>('topup');
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [gameAccountId, setGameAccountId] = useState('');
  const [gameServer, setGameServer] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(TOP_COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [expandedPaymentGroup, setExpandedPaymentGroup] = useState<string | null>('qris');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const getAdminFee = () => {
    if (!selectedPackage) return 0;
    const basePrice = selectedPackage.price * quantity;
    let adminFee = 0;
    if (selectedPayment) {
        if (selectedPayment.startsWith('qris')) {
            adminFee = basePrice * 0.007; // 0.7%
        } else if (['ovo', 'dana', 'shopeepay', 'gopay'].includes(selectedPayment)) {
            adminFee = basePrice * 0.015; // 1.5%
        } else if (selectedPayment.startsWith('va_')) {
            adminFee = 4000;
        } else if (selectedPayment === 'indomaret' || selectedPayment === 'alfamart') {
            adminFee = 5000;
        }
    }
    return Math.floor(adminFee);
  };

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    
    const basePrice = selectedPackage.price * quantity;
    return basePrice + getAdminFee();
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => {
      setUser(u);
    });
    return unsub;
  }, []);

  const handleCheckout = () => {
    if (!gameAccountId || !gameServer || !whatsapp || !selectedPackage) {
      alert('Harap lengkapi formulir (ID, Server, Nominal, Whatsapp).');
      return;
    }
    if (!selectedPayment) {
      alert('Harap pilih metode pembayaran.');
      return;
    }
    setIsConfirmationOpen(true);
  };

  const processCheckout = async () => {
    setIsSubmitting(true);
    const invoiceId = 'LD' + Math.floor(Math.random() * 10000000000);
    const price = calculateTotal();
    const packageName = selectedPackage.name;

    try {
      await setDoc(doc(db, 'transactions', invoiceId), {
        invoiceId,
        userId: user?.uid || 'guest',
        gameName: 'Mobile Legends',
        gameAccountId,
        gameServer,
        packageName,
        quantity,
        paymentMethod: selectedPayment,
        price,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      setCreatedInvoice({
        invoiceId,
        gameAccountId,
        gameServer,
        packageName,
        quantity,
        paymentMethod: selectedPayment,
        price,
      });
      setIsConfirmationOpen(false);
    } catch (err: any) {
      handleFirestoreError(err, OperationType.CREATE, `transactions/${invoiceId}`);
      alert('Gagal membuat pesanan. Silahkan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="relative min-h-screen flex flex-col bg-[#1c1a17] font-sans text-white">
      <RegionModal isOpen={isRegionModalOpen} onClose={() => setIsRegionModalOpen(false)} />
      <InvoiceModal invoice={createdInvoice} onClose={() => setCreatedInvoice(null)} />
      <OrderConfirmationModal 
         isOpen={isConfirmationOpen}
         onClose={() => setIsConfirmationOpen(false)}
         onConfirm={processCheckout}
         gameName="Mobile Legends"
         packageName={selectedPackage?.name || ''}
         paymentMethod={selectedPayment || ''}
         price={selectedPackage?.price || 0}
         quantity={quantity}
         adminFee={getAdminFee()}
         total={calculateTotal()}
         gameAccountId={gameAccountId}
         gameServer={gameServer}
         isSubmitting={isSubmitting}
      />
      {/* Header and NavBar */}
      <header className="sticky top-0 z-50 flex w-full flex-col">
        {/* Upper Nav */}
        <div className="flex flex-wrap items-center justify-between gap-y-3 border-b border-white/5 bg-[#262626] px-4 py-3 md:flex-nowrap md:gap-4 md:px-8">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center justify-center pt-1 leading-none shadow-sm pb-1 order-1 cursor-pointer">
             <Logo scale={0.7} />
          </Link>
          
          {/* Search & Region */}
          <div className="order-2 flex w-full flex-1 gap-2 md:ml-4 items-center md:w-auto">
            {/* Search Bar */}
            <div className="flex w-full flex-1 items-center rounded-lg bg-[#333333] px-3 py-2 transition-colors focus-within:bg-[#3a3a3a] md:py-2">
              <Search className="mr-2 md:mr-3 h-4 w-4 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari Game atau Voucher"
                className="w-full bg-transparent text-xs md:text-sm text-white placeholder-gray-400 outline-none"
              />
            </div>

            {/* Region / Currency Toggle */}
            <button 
              onClick={() => setIsRegionModalOpen(true)}
              className="flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-[#333333] px-2 py-1 h-full md:px-3 md:py-2 text-[10px] md:text-xs font-semibold transition hover:bg-[#3a3a3a] cursor-pointer"
            >
              <span className="relative h-[14px] w-[14px] shrink-0 overflow-hidden rounded-full drop-shadow-sm border border-black/10">
                <span className="absolute inset-x-0 top-0 h-1/2 bg-[#ff0000]"></span>
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-white"></span>
              </span>
              ID / IDR
            </button>
          </div>
        </div>

        {/* Lower Nav */}
        <div className="flex items-center justify-between bg-[#262626] px-4 shadow-md md:px-8">
          <div className="flex gap-6 text-sm py-3">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 font-medium text-[#f27221] border-b-2 border-[#f27221]/50 pb-1 cursor-pointer">Topup</button>
            <button onClick={() => navigate('/?tab=cek-transaksi')} className="flex items-center gap-2 font-medium text-gray-300 hover:text-white transition pb-1 cursor-pointer">Cek Transaksi</button>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-4 md:gap-6 text-xs md:text-sm ml-4 py-3">
            {user && (
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#f27221] hidden md:block">Hi, {user.email || 'User'}</span>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* Main Hero hero */}
      <section className="relative w-full overflow-hidden">
        <div className="w-full aspect-[21/5] min-h-[150px] bg-gradient-to-r from-[#f27221] via-[#f27221] to-red-900 border-b-4 border-[#f27221] relative">
         <img src="/Gemini_Generated_Image_2q24tz2q24tz2q24.png" alt="Hero Mobile Legends" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Main Grid Content */}
      <main className="mx-auto w-full max-w-[1300px] px-4 py-6 md:px-8 mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        
        {/* Left Column (Forms) */}
        <div className="flex flex-col gap-6">
          
          {/* Game Header Mobile Legends */}
          <div className="flex items-center gap-4 bg-[#23211d] rounded-xl p-4 shadow-sm border border-white/5 relative z-10 -mt-16 sm:-mt-12 w-fit xl:w-full ml-4">
             <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 border-[#f27221] bg-gray-800">
               <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FMLIndonesia-ezgif.com-jpg-to-webp-converter%20(1).webp&w=256&q=75" alt="MLBB Logo" className="w-full h-full object-cover" />
             </div>
             <div className="flex flex-col">
               <h2 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight">MOBILE LEGENDS</h2>
               <p className="text-sm text-gray-400">Moonton</p>
               <div className="flex items-center gap-3 mt-2 text-[10px] sm:text-xs">
                 <span className="flex items-center gap-1 text-green-400"><Flame className="h-3 w-3 animate-pulse" /> Proses Cepat</span>
                 <span className="flex items-center gap-1 text-blue-400"><Flame className="h-3 w-3 animate-pulse animate-delay-[200ms]" /> Layanan Chat 24/7</span>
                 <span className="flex items-center gap-1 text-purple-400"><Flame className="h-3 w-3 animate-pulse animate-delay-[400ms]" /> Pembayaran Aman!</span>
               </div>
             </div>
          </div>

          {/* Section 1: Masukkan Data Akun */}
          <section className="bg-[#2a2723] rounded-xl p-5 shadow-sm border border-white/5 relative">
            <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#f27221] to-[#f27221] text-white font-extrabold flex items-center justify-center text-lg shadow-md border-2 border-[#2a2723]">1</div>
            <h3 className="text-sm font-bold text-white mb-4 pl-4 uppercase">Masukkan Data Akun</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">ID <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Masukkan ID" value={gameAccountId} onChange={e => setGameAccountId(e.target.value)} className="w-full rounded-md bg-[#1f1d19] border border-white/10 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#f27221] focus:bg-[#25221d]" />
               </div>
               <div>
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Server</label>
                  <input type="text" placeholder="Masukkan Server" value={gameServer} onChange={e => setGameServer(e.target.value)} className="w-full rounded-md bg-[#1f1d19] border border-white/10 px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#f27221] focus:bg-[#25221d]" />
               </div>
            </div>
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/20 rounded-md text-xs text-blue-200">
               <p className="flex items-start gap-2"><span className="text-blue-400 shrink-0 select-none">ℹ</span> Untuk mengetahui User ID Anda, silahkan klik menu profile dibagian kiri atas pada menu utama game. User ID akan terlihat dibagian bawah Nama Karakter Game Anda. Silahkan masukan User ID Anda untuk menyelesaikan transaksi. Contoh : 12345678 (1234).</p>
            </div>
          </section>

          {/* Section 2: Pilih Nominal */}
          <section className="bg-[#2a2723] rounded-xl p-5 shadow-sm border border-white/5 relative">
            <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#f27221] to-[#f27221] text-white font-extrabold flex items-center justify-center text-lg shadow-md border-2 border-[#2a2723]">2</div>
            <h3 className="text-sm font-bold text-white mb-4 pl-4 uppercase">Pilih Nominal</h3>
            
            {/* Flash Sale category */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3 bg-[#1f1d19] py-2 px-3 rounded-md border-l-4 border-[#f27221] uppercase tracking-tight">
                <Flame className="h-4 w-4 text-[#f27221] fill-[#f27221] animation-pulse" />
                Flash Sale
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 <div onClick={() => setSelectedPackage({ name: 'Weekly Diamond Pass (Promo)', price: 26999 })} className={`relative overflow-hidden group cursor-pointer rounded-xl bg-gradient-to-b from-[#403b33] to-[#25221d] border ${selectedPackage?.name === 'Weekly Diamond Pass (Promo)' ? 'border-[#f27221] ring-2 ring-[#f27221]/50' : 'border-[#f27221]/50'} p-3 hover:border-[#f27221]/50 transition-colors`}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7">
                        <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FIcon1-ezgif.com-jpg-to-webp-converter.webp&w=48&q=75" alt="WDP" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-white leading-tight">Weekly Diamond Pass (Promo)</span>
                      </div>
                    </div>
                    <div className="mt-2">
                       <div className="text-sm font-bold text-[#f27221]">Rp 26.999</div>
                       <div className="text-[10px] text-gray-500 line-through">Rp 28.500</div>
                    </div>
                    <div className="mt-2 w-full bg-black/40 rounded-full h-1.5 overflow-hidden">
                       <div className="bg-gradient-to-r from-red-500 to-[#f27221] h-full w-[80%] rounded-full"></div>
                    </div>
                    <div className="text-[9px] text-gray-400 mt-1 flex justify-between">
                       <span>80% sold</span>
                       <span>266,082 / 999,999 purchased</span>
                    </div>
                    <div className="absolute top-0 right-0 bg-red-600 px-2 py-0.5 rounded-bl-lg text-[9px] font-bold text-white">Sisa 11%</div>
                 </div>
              </div>
            </div>

            {/* WDP Termurah */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3 bg-[#1f1d19] py-2 px-3 rounded-md border-l-4 border-blue-500 uppercase tracking-tight">
                🔥 WDP Termurah di Indonesia
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 {[1, 2, 3, 4, 5, "Twilight Pass"].map((val, i) => {
                    const itemName = typeof val === 'number' ? `${val}x Weekly Diamond Pass` : val;
                    const itemPrice = typeof val === 'number' ? val * 27000 : 149999;
                    return (
                    <div key={i} onClick={() => setSelectedPackage({ name: itemName, price: itemPrice })} className={`relative overflow-hidden group cursor-pointer rounded-xl bg-[#1f1d19] border ${selectedPackage?.name === itemName ? 'border-[#f27221] ring-2 ring-[#f27221]/50' : 'border-white/10'} p-3 hover:border-[#f27221] transition-colors`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6">
                            <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fproduct%2FIcon1-ezgif.com-jpg-to-webp-converter.webp&w=48&q=75" alt="img" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-[11px] font-bold text-white leading-tight">
                           {typeof val === 'number' ? `${val}x Weekly Diamond Pass` : val}
                        </div>
                      </div>
                      <div className="mt-2">
                         <div className="text-sm font-bold text-[#f27221]">Rp {itemPrice}</div>
                         <div className="text-[10px] text-gray-500 line-through">Rp {itemPrice + 5000}</div>
                      </div>
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-[#f27221] to-[#f27221] px-2 py-0.5 rounded-bl-lg text-[9px] font-bold text-black border-l border-b border-black">Sisa 11%</div>
                    </div>
                 )}
                 )}
              </div>
            </div>

             {/* Topup Cepat */}
            <div className="mb-6">
              <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3 bg-[#1f1d19] py-2 px-3 rounded-md border-l-4 border-purple-500 uppercase tracking-tight">
                ⚡ Instant 1 Detik
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                 {instant1DetikPackages.map((pkg, i) => (
                    <div key={i} onClick={() => setSelectedPackage({ name: pkg.name, price: pkg.price })} className={`relative overflow-hidden group cursor-pointer rounded-xl bg-[#1f1d19] border ${selectedPackage?.name === pkg.name ? 'border-[#f27221] ring-2 ring-[#f27221]/50' : 'border-white/10'} p-3 hover:border-[#f27221] transition-colors`}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 shrink-0">
                            <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fgallery%2F5%20-%2059.webp&w=750&q=75" />
                        </div>
                        <div className="text-[11px] font-bold text-white leading-tight">
                           {pkg.name}
                        </div>
                      </div>
                      <div className="mt-2 text-left">
                         <div className="text-sm font-bold text-[#f27221]">Rp {pkg.price.toLocaleString('id-ID')}</div>
                         {pkg.oldPrice && <div className="text-[10px] text-gray-500 line-through">Rp {pkg.oldPrice.toLocaleString('id-ID')}</div>}
                      </div>
                      {pkg.label && (
                         <div className="absolute top-0 right-0 bg-[#f27221] px-2 py-0.5 rounded-bl-lg text-[9px] font-bold text-black border-l border-b border-black">{pkg.label}</div>
                      )}
                    </div>
                 ))}
              </div>
            </div>
            
          </section>

          {/* Section 3: Masukkan Jumlah Pembelian */}
          <section className="bg-[#2a2723] rounded-xl p-5 shadow-sm border border-white/5 relative">
            <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#f27221] to-[#f27221] text-white font-extrabold flex items-center justify-center text-lg shadow-md border-2 border-[#2a2723]">3</div>
            <h3 className="text-sm font-bold text-white mb-4 pl-4 uppercase">Masukkan Jumlah Pembelian</h3>
            <div className="flex items-center">
               <div className="flex items-center rounded-lg bg-[#1f1d19] border border-white/10 overflow-hidden w-full max-w-[200px]">
                  <input type="number" min="1" max="99" value={quantity} onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val > 0 && val < 100) setQuantity(val);
                      else if (e.target.value === '') setQuantity(1); // or let it be empty, simple logic for now
                    }} className="w-full bg-transparent text-center text-sm font-bold text-white py-2.5 outline-none border-r border-white/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                  <div className="flex divide-x divide-white/10">
                    <button onClick={() => setQuantity(q => q < 99 ? q + 1 : q)} className="px-4 py-2 bg-gradient-to-br from-[#f27221] to-[#f27221] hover:from-[#f27221] hover:to-[#f27221] text-white font-bold transition-colors">+</button>
                    <button onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)} className="px-4 py-2 bg-[#333] hover:bg-[#444] text-white font-bold transition-colors">-</button>
                  </div>
               </div>
            </div>
          </section>

          {/* Section 4: Pilih Pembayaran */}
          <section className="bg-[#2a2723] rounded-xl p-5 shadow-sm border border-white/5 relative">
            <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#f27221] to-[#f27221] text-white font-extrabold flex items-center justify-center text-lg shadow-md border-2 border-[#2a2723]">4</div>
            <h3 className="text-sm font-bold text-white mb-4 pl-4 uppercase">Pilih Pembayaran</h3>
            
            <div className="space-y-3">
               <div 
                 onClick={() => setSelectedPayment('nina_coins')}
                 className={`rounded-xl border-2 p-4 cursor-pointer relative overflow-hidden transition-colors flex justify-between items-center ${selectedPayment === 'nina_coins' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-gray-500 bg-[#4a4a4a] hover:bg-[#5a5a5a]'}`}>
                  <div className="absolute top-0 right-0 bg-[#f27221] px-5 py-1 text-xs font-bold text-white transform translate-x-[20px] translate-y-[10px] rotate-45 origin-center">BEST PRICE</div>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 overflow-hidden flex items-center justify-center">
                        <img src="https://client-cdn.bangjeff.com/lumosdiamond.com/meta/fasfasfafafafaf-ezgif.com-jpg-to-webp-converter%20(1).webp" alt="Coin" className="h-full object-contain drop-shadow" />
                     </div>
                     <div className="text-base font-bold text-white">Nina Coins (Bebas Biaya Admin)</div>
                  </div>
                  <div className="pr-12 text-[#ff4c8b] text-sm font-medium">Max. 0,00 Nina Coins</div>
               </div>

               <div 
                 onClick={() => setSelectedPayment('qris_best')}
                 className={`rounded-xl border-2 p-4 cursor-pointer relative overflow-hidden transition-colors flex justify-between items-center ${selectedPayment === 'qris_best' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-gray-500 bg-[#4a4a4a] hover:bg-[#5a5a5a]'}`}>
                  <div className="absolute top-0 right-0 bg-[#f27221] px-5 py-1 text-xs font-bold text-white transform translate-x-[20px] translate-y-[10px] rotate-45 origin-center">BEST PRICE</div>
                  <div className="flex flex-col gap-2">
                     <div className="text-sm font-bold text-white">QRIS (DANA,OVO,SHOPEEPAY,GOPAY,BCA,DLL)</div>
                     <div className="flex items-center gap-1 bg-white p-1 pb-0 rounded-sm inline-block self-start">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-4 object-contain" />
                     </div>
                  </div>
                  <div className="pr-12 text-white text-lg font-bold">Rp {selectedPackage ? calculateTotal().toLocaleString('id-ID') : '0'}</div>
               </div>

               <div className={`rounded-xl border overflow-hidden ${expandedPaymentGroup === 'qris' ? 'border-[#f27221]' : 'border-gray-500'} bg-[#4a4a4a]`}>
                  <div 
                    onClick={() => setExpandedPaymentGroup(expandedPaymentGroup === 'qris' ? null : 'qris')}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#5a5a5a] transition-colors"
                  >
                     <div className="text-sm font-bold text-white w-1/4">QRIS</div>
                     <div className="flex items-center justify-end gap-2 flex-wrap flex-1 pr-4">
                        <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fgallery%2Fnew%20qris%20bni.webp&w=1920&q=75" alt="BNI" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" alt="DANA" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Mandiri" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fgallery%2Fovo-va.webp&w=1920&q=75" alt="OVO" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" alt="GoPay" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" alt="ShopeePay" className="h-4 bg-white px-1 rounded-sm object-contain" />
                     </div>
                     <ChevronRight className={`h-5 w-5 text-gray-300 transition-transform ${expandedPaymentGroup === 'qris' ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedPaymentGroup === 'qris' && (
                     <div className="p-4 border-t border-gray-600 bg-[#3d3d3d]">
                        <div 
                          onClick={() => setSelectedPayment('qris')}
                          className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'qris' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}
                        >
                          <div className="flex items-center justify-between mb-2">
                             <div className="text-sm font-bold text-white">QRIS</div>
                             <div className="text-[10px] text-gray-400 max-w-[150px] text-right truncate">DANA, OVO, SHOPEEPAY, GOPAY, BCA, DLL</div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                             <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_QRIS.svg" alt="QRIS" className="h-6 bg-white px-2 py-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 100,00 IDR</div>
                        </div>
                     </div>
                  )}
               </div>

               <div className={`rounded-xl border overflow-hidden ${expandedPaymentGroup === 'ewallet' ? 'border-[#f27221]' : 'border-gray-500'} bg-[#4a4a4a]`}>
                  <div 
                    onClick={() => setExpandedPaymentGroup(expandedPaymentGroup === 'ewallet' ? null : 'ewallet')}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#5a5a5a] transition-colors"
                  >
                     <div className="text-sm font-bold text-white w-1/4">E-Wallet</div>
                     <div className="flex items-center justify-end gap-2 flex-wrap flex-1 pr-4">
                        <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fgallery%2Fovo-va.webp&w=1920&q=75" alt="OVO" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" alt="ShopeePay" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" alt="DANA" className="h-4 bg-white px-1 rounded-sm object-contain" />
                     </div>
                     <ChevronRight className={`h-5 w-5 text-gray-300 transition-transform ${expandedPaymentGroup === 'ewallet' ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedPaymentGroup === 'ewallet' && (
                     <div className="p-4 border-t border-gray-600 grid grid-cols-2 gap-3 bg-[#3d3d3d]">
                        <div onClick={() => setSelectedPayment('dana')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'dana' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">DANA</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Logo_dana_blue.svg" alt="DANA" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 1.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('ovo')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'ovo' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">OVO</div>
                            <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fgallery%2Fovo-va.webp&w=1920&q=75" alt="OVO" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 1.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('shopeepay')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'shopeepay' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">ShopeePay</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" alt="ShopeePay" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 1.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('gopay')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'gopay' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">GoPay</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Gopay_logo.svg" alt="GoPay" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 1.000,00 IDR</div>
                        </div>
                     </div>
                  )}
               </div>
               
               <div className={`rounded-xl border overflow-hidden ${expandedPaymentGroup === 'va' ? 'border-[#f27221]' : 'border-gray-500'} bg-[#4a4a4a]`}>
                  <div 
                    onClick={() => setExpandedPaymentGroup(expandedPaymentGroup === 'va' ? null : 'va')}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#5a5a5a] transition-colors"
                  >
                     <div className="text-sm font-bold text-white w-1/4">Virtual Account</div>
                     <div className="flex items-center justify-end gap-2 flex-wrap flex-1 pr-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg" alt="BRI" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Mandiri" className="h-4 bg-white px-1 rounded-sm object-contain" />
                     </div>
                     <ChevronRight className={`h-5 w-5 text-gray-300 transition-transform ${expandedPaymentGroup === 'va' ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedPaymentGroup === 'va' && (
                     <div className="p-4 border-t border-gray-600 grid grid-cols-2 gap-3 bg-[#3d3d3d]">
                        <div onClick={() => setSelectedPayment('va_bca')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'va_bca' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">BCA VA</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 10.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('va_mandiri')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'va_mandiri' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">Mandiri VA</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Mandiri" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 10.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('va_bni')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'va_bni' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">BNI VA</div>
                            <img src="https://www.lumosdiamond.com/_next/image?url=https%3A%2F%2Fclient-cdn.bangjeff.com%2Flumosdiamond.com%2Fgallery%2Fbni-va.webp&w=1920&q=75" alt="BNI" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 10.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('va_bri')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'va_bri' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">BRI VA</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg" alt="BRI" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 10.000,00 IDR</div>
                        </div>
                     </div>
                  )}
               </div>
               
               <div className={`rounded-xl border overflow-hidden ${expandedPaymentGroup === 'cstore' ? 'border-[#f27221]' : 'border-gray-500'} bg-[#4a4a4a]`}>
                  <div 
                    onClick={() => setExpandedPaymentGroup(expandedPaymentGroup === 'cstore' ? null : 'cstore')}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#5a5a5a] transition-colors"
                  >
                     <div className="text-sm font-bold text-white w-1/4">Convenience Store</div>
                     <div className="flex items-center justify-end gap-2 flex-wrap flex-1 pr-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png" alt="Indomaret" className="h-4 bg-white px-1 rounded-sm object-contain" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg" alt="Alfamart" className="h-4 bg-white px-1 rounded-sm object-contain" />
                     </div>
                     <ChevronRight className={`h-5 w-5 text-gray-300 transition-transform ${expandedPaymentGroup === 'cstore' ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedPaymentGroup === 'cstore' && (
                     <div className="p-4 border-t border-gray-600 grid grid-cols-2 gap-3 bg-[#3d3d3d]">
                        <div onClick={() => setSelectedPayment('indomaret')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'indomaret' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">Indomaret</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Logo_Indomaret.png" alt="Indomaret" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 10.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('alfamart')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'alfamart' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">Alfamart</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/86/Alfamart_logo.svg" alt="Alfamart" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 10.000,00 IDR</div>
                        </div>
                     </div>
                  )}
               </div>

               <div className={`rounded-xl border overflow-hidden ${expandedPaymentGroup === 'transfer' ? 'border-[#f27221]' : 'border-gray-500'} bg-[#4a4a4a]`}>
                  <div 
                    onClick={() => setExpandedPaymentGroup(expandedPaymentGroup === 'transfer' ? null : 'transfer')}
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-[#5a5a5a] transition-colors"
                  >
                     <div className="text-sm font-bold text-white w-1/4">Transfer Bank</div>
                     <div className="flex items-center justify-end gap-2 flex-wrap flex-1 pr-4">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/BRI_2020.svg" alt="BRI" className="h-4 bg-white px-1 rounded-sm object-contain" />
                     </div>
                     <ChevronRight className={`h-5 w-5 text-gray-300 transition-transform ${expandedPaymentGroup === 'transfer' ? 'rotate-90' : ''}`} />
                  </div>
                  {expandedPaymentGroup === 'transfer' && (
                     <div className="p-4 border-t border-gray-600 grid grid-cols-2 gap-3 bg-[#3d3d3d]">
                        <div onClick={() => setSelectedPayment('tf_bca')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'tf_bca' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">Transfer BCA</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg" alt="BCA" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 50.000,00 IDR</div>
                        </div>
                        <div onClick={() => setSelectedPayment('tf_mandiri')} className={`rounded-lg border p-3 cursor-pointer transition-all ${selectedPayment === 'tf_mandiri' ? 'border-[#f27221] bg-[#f27221]/10' : 'border-white/10 bg-[#25221d] hover:border-gray-500'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-white">Transfer Mandiri</div>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg" alt="Mandiri" className="h-5 bg-white px-1 rounded object-contain" />
                          </div>
                          <div className="text-xs text-gray-400">Min. 50.000,00 IDR</div>
                        </div>
                     </div>
                  )}
               </div>

            </div>
          </section>

          {/* Section 5: Kode Promo */}
          <section className="bg-[#2a2723] rounded-xl p-5 shadow-sm border border-white/5 relative">
            <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#f27221] to-[#f27221] text-white font-extrabold flex items-center justify-center text-lg shadow-md border-2 border-[#2a2723]">5</div>
            <h3 className="text-sm font-bold text-white mb-4 pl-4 uppercase">Kode Promo</h3>
            <div className="flex gap-2">
               <input type="text" placeholder="Ketik Kode Promo Kamu" className="flex-1 rounded-md bg-[#1f1d19] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#f27221] focus:bg-[#25221d]" />
               <button className="px-6 py-2.5 rounded-md bg-gradient-to-br from-[#f27221] to-[#f27221] hover:from-[#f27221] hover:to-[#f27221] text-white font-bold transition-colors text-sm whitespace-nowrap border border-black/20">Gunakan</button>
            </div>
          </section>

          {/* Section 6: Detail Kontak */}
          <section className="bg-[#2a2723] rounded-xl p-5 shadow-sm border border-white/5 relative">
            <div className="absolute -left-3 -top-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#f27221] to-[#f27221] text-white font-extrabold flex items-center justify-center text-lg shadow-md border-2 border-[#2a2723]">6</div>
            <h3 className="text-sm font-bold text-white mb-4 pl-4 uppercase">Detail Kontak</h3>
            <label className="text-xs font-semibold text-gray-400 mb-1.5 block">No. WhatsApp <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="flex items-center w-full rounded-md bg-[#1f1d19] overflow-hidden border border-white/10 focus-within:border-[#f27221] transition-colors">
                <div 
                  className="flex items-center gap-1.5 px-3 py-2.5 border-r border-white/10 bg-[#25221d] cursor-pointer hover:bg-white/5 transition"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                >
                  <img src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`} alt={selectedCountry.code} className="w-5 object-contain" />
                  <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isCountryDropdownOpen ? 'rotate-180' : ''}`} />
                  <span className="text-sm text-white font-medium">{selectedCountry.dial}</span>
                </div>
                <input 
                  type="text" 
                  placeholder="081xxxxx" 
                  value={whatsapp}
                  onChange={e => setWhatsapp(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:bg-[#25221d] transition"
                />
              </div>
              
              {isCountryDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCountryDropdownOpen(false)} />
                  <div className="absolute left-0 bottom-full mb-1 w-[280px] bg-[#66686d] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-64">
                    <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-[#5d6168]">
                       <Search className="w-4 h-4 text-gray-300" />
                       <input 
                          type="text" 
                          placeholder="Cari negara..." 
                          value={searchCountry}
                          onChange={(e) => setSearchCountry(e.target.value)}
                          className="bg-transparent border-none outline-none text-sm text-white w-full placeholder-white"
                       />
                    </div>
                    <div className="overflow-y-auto custom-scrollbar flex-1 bg-[#66686d]">
                      {TOP_COUNTRIES.filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase()) || c.dial.includes(searchCountry)).map(country => (
                        <div 
                           key={country.code} 
                           className={`flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-white/10 transition-colors ${selectedCountry.code === country.code ? 'bg-[#56595f]' : ''}`}
                         onClick={() => {
                           setSelectedCountry(country);
                           setIsCountryDropdownOpen(false);
                           setSearchCountry('');
                         }}
                      >
                         <div className="flex items-center gap-3">
                            <img src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`} alt={country.code} className="w-5 object-contain" />
                            <span className="text-sm text-zinc-200 font-medium">{country.name}</span>
                         </div>
                         <span className="text-xs text-zinc-300 font-medium">{country.dial}</span>
                      </div>
                    ))}
                    {TOP_COUNTRIES.filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase()) || c.dial.includes(searchCountry)).length === 0 && (
                      <div className="p-4 text-center text-sm text-zinc-300">Negara tidak ditemukan</div>
                    )}
                  </div>
                </div>
                </>
              )}
            </div>
            <p className="mt-2 text-[10px] text-gray-500 italic">*Nomor ini akan dihubungi jika terjadi masalah</p>
          </section>

          <div className="bg-[#484b51] rounded-xl overflow-hidden shadow-sm border border-transparent mt-6 mb-6">
            <div className="bg-[#6b7280] p-3 text-sm font-bold text-white flex items-center relative">
               <div className="bg-[#f27221] w-4 h-full absolute left-0 top-0 bottom-0 rounded-tl-xl object-fill"></div>
               <div className="relative pl-3">Deskripsi Mobile Legends</div>
            </div>
            <div className="p-4 text-xs text-gray-200">
               <p className="mb-2">Top Up ML Diamond Mobile Legends Official Distributor</p>
                 <ol className="pl-4 space-y-1 mt-1 font-medium list-none">
                   <li>Masukkan ID & Server</li>
                   <li>Pilih Nominal</li>
                   <li>Pilih Pembayaran</li>
                   <li>Masukkan Kode Promo (jika ada)</li>
                   <li>Masukkan No WhatsApp</li>
                   <li>Klik Order Now & Lakukan Pembayaran</li>
                   <li>Diamonds akan otomatis masuk ke akun kamu</li>
                 </ol>
                 <p className="mt-4">Layanan CS :<br/>WhatsApp https://wa.me/+6281212345370<br/>Instagram instagram.com/lumos_diamond</p>
            </div>
          </div>

          {/* Checkout Info / Submit Button block */}
          <div className="sticky bottom-4 z-40 bg-[#2a2723] rounded-xl p-4 shadow-xl border border-[#f27221]/50/30 flex items-center justify-between">
            <div>
               <div className="text-xs text-gray-400 mb-0.5">Total Pembayaran</div>
               <div className="text-lg md:text-xl font-bold text-[#f27221]">Rp {calculateTotal().toLocaleString('id-ID')}</div>
            </div>
            <button onClick={handleCheckout} disabled={isSubmitting} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-b from-[#f27221] to-[#f27221] hover:from-[#f27221] hover:to-[#f27221] text-white font-bold transition-all shadow-lg shadow-[#f27221]/20 active:scale-95 border border-[#f27221]/50 w-full sm:w-auto justify-center disabled:opacity-50">
               {isSubmitting ? 'Memproses...' : 'Beli Sekarang!'} <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

        {/* Right Column (Sidebar Information) */}
        <div className="flex flex-col gap-4">
           {/* Review Panel */}
           <div className="rounded-xl bg-[#2a2723] border border-white/5 overflow-hidden shadow-md hidden lg:block sticky top-20">
              <div className="bg-[#1f1d19] p-4 border-b border-white/5">
                 <h3 className="text-sm font-bold text-white mb-2">Ulasan dan rating</h3>
                 <div className="flex items-end gap-3">
                    <span className="text-5xl font-black text-white leading-none tracking-tight">0.00</span>
                    <div className="flex items-center gap-1 mb-1">
                       <Star className="h-7 w-7 text-gray-500 fill-gray-500" />
                       <Star className="h-7 w-7 text-gray-500 fill-gray-500" />
                       <Star className="h-7 w-7 text-gray-500 fill-gray-500" />
                       <Star className="h-7 w-7 text-gray-500 fill-gray-500" />
                       <Star className="h-7 w-7 text-gray-500 fill-gray-500" />
                    </div>
                 </div>
                 <div className="text-[12px] font-bold text-white mt-1.5">Berdasarkan total 0 rating</div>
              </div>
              <div className="p-4 bg-blue-900/10 border-b border-white/5 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-blue-500/20 flex-shrink-0 flex items-center justify-center text-blue-400">
                    ℹ
                 </div>
                 <div className="text-xs text-blue-200">
                    <span className="font-semibold text-white">Butuh bantuan?</span><br />Kamu bisa hubungi admin disini.
                 </div>
              </div>
              <div className="p-6 flex flex-col items-center justify-center text-center min-h-[150px]">
                 <span className="text-xs text-gray-500 italic">Belum ada item produk yang dipilih.</span>
              </div>
           </div>
        </div>

      </main>

      {/* Footer Area with SVG Wave above it */}
      <div className="relative mt-20 pt-20 bg-[#161616]">
          {/* Wave SVG separator */}
          <div className="absolute -top-[1px] md:-top-[20px] lg:-top-[30px] xl:-top-[60px] left-0 w-full overflow-hidden leading-0">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto transform rotate-180 drop-shadow-xl" preserveAspectRatio="none">
               <path fill="#1c1a17" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
             </svg>
          </div>

          <div className="mx-auto max-w-[1300px] px-4 pb-8 pt-10 md:px-8 relative z-10">

              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-white/5 pt-8">
                  {/* Brand Column */}
                  <div className="col-span-1 md:col-span-1 flex flex-col items-start gap-4">
                     <Logo scale={1} />
                     <div className="text-sm text-gray-400 mt-2 max-w-sm leading-relaxed">
                        <p>Website Top Up Game Termurah Dan Tercepat Se-Indonesia</p>
                        <p>© 2026 NINA DIAMOND. All rights reserved.</p>
                     </div>
                  </div>
                  {/* Empty Spacer or Links */}
                  <div className="md:col-span-1"></div>

                  {/* Link Columns */}
                  <div className="col-span-1 grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-2 text-sm text-gray-400">
                      
                      <div className="flex flex-col gap-3">
                         <h4 className="font-bold text-[#ff8a00] mb-2 uppercase tracking-wide text-xs">Peta Situs</h4>
                         <Link to="/" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition">Beranda</Link>
                         <Link to="/?login=true" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition">Masuk</Link>
                         <Link to="/?register=true" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition">Daftar</Link>
                         <Link to="/?tab=cek-transaksi" onClick={() => window.scrollTo(0, 0)} className="hover:text-white transition">Cek Transaksi</Link>
                         <a href="#" className="hover:text-white transition">Hubungi Kami</a>
                         <a href="#" className="hover:text-white transition">Ulasan</a>
                      </div>

                      <div className="flex flex-col gap-3">
                         <h4 className="font-bold text-[#ff8a00] mb-2 uppercase tracking-wide text-xs">Dukungan</h4>
                         {/* Empty in reference screenshot except for title but let's leave space */}
                      </div>

                      <div className="flex flex-col gap-3">
                         <h4 className="font-bold text-[#ff8a00] mb-2 uppercase tracking-wide text-xs">Legalitas</h4>
                         <a href="#" className="hover:text-white transition">Kebijakan Pribadi</a>
                         <a href="#" className="hover:text-white transition">Syarat & Ketentuan</a>
                      </div>

                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}
