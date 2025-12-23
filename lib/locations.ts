// Bangladesh location data
export const divisions = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barisal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
]

export const districts: Record<string, string[]> = {
  Dhaka: [
    'Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Manikganj', 'Munshiganj', 
    'Narsingdi', 'Kishoreganj', 'Faridpur', 'Gopalganj', 'Madaripur', 
    'Shariatpur', 'Rajbari'
  ],
  Chittagong: [
    'Chittagong', 'Cox\'s Bazar', 'Comilla', 'Feni', 'Noakhali', 'Brahmanbaria',
    'Chandpur', 'Lakshmipur', 'Bandarban', 'Rangamati', 'Khagrachhari'
  ],
  Rajshahi: [
    'Rajshahi', 'Bogra', 'Pabna', 'Sirajganj', 'Natore', 'Naogaon',
    'Chapainawabganj', 'Joypurhat', 'Kushtia', 'Meherpur', 'Chuadanga',
    'Jhenaidah', 'Magura', 'Narail'
  ],
  Khulna: [
    'Khulna', 'Jessore', 'Satkhira', 'Bagerhat'
  ],
  Barisal: [
    'Barisal', 'Patuakhali', 'Bhola', 'Pirojpur', 'Jhalokati', 'Barguna'
  ],
  Sylhet: [
    'Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'
  ],
  Rangpur: [
    'Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat',
    'Nilphamari', 'Panchagarh', 'Thakurgaon'
  ],
  Mymensingh: [
    'Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'
  ],
}

export const cities: Record<string, string[]> = {
  // Dhaka Division
  'Dhaka': [
    'Gulshan', 'Dhanmondi', 'Uttara', 'Banani', 'Wari', 'Old Dhaka',
    'Motijheel', 'Ramna', 'Tejgaon', 'Mohammadpur', 'Mirpur', 'Lalbagh',
    'Sutrapur', 'Kotwali', 'Sabujbagh', 'Cantonment', 'Demra', 'Dhanmondi',
    'Kafrul', 'Kamrangirchar', 'Khilgaon', 'Pallabi', 'Rampura', 'Shah Ali',
    'Shahbagh', 'Sher-e-Bangla Nagar', 'Tejgaon Industrial Area', 'Turag'
  ],
  'Gazipur': [
    'Gazipur City', 'Kaliakair', 'Kapasia', 'Sreepur', 'Tongi'
  ],
  'Narayanganj': [
    'Narayanganj City', 'Bandar', 'Rupganj', 'Sonargaon'
  ],
  'Tangail': [
    'Tangail City', 'Basail', 'Bhuapur', 'Delduar', 'Dhanbari', 'Ghatail',
    'Gopalpur', 'Kalihati', 'Madhupur', 'Mirzapur', 'Nagarpur', 'Sakhipur'
  ],
  'Manikganj': [
    'Manikganj City', 'Daulatpur', 'Ghior', 'Harirampur', 'Saturia', 'Shibalaya', 'Singair'
  ],
  'Munshiganj': [
    'Munshiganj City', 'Gazaria', 'Lohajang', 'Sirajdikhan', 'Sreenagar', 'Tongibari'
  ],
  'Narsingdi': [
    'Narsingdi City', 'Belabo', 'Monohardi', 'Palash', 'Raipura', 'Shibpur'
  ],
  'Kishoreganj': [
    'Kishoreganj City', 'Austagram', 'Bajitpur', 'Bhairab', 'Hossainpur', 'Itna',
    'Karimganj', 'Katiadi', 'Kuliarchar', 'Mithamain', 'Nikli', 'Pakundia', 'Tarail'
  ],
  'Faridpur': [
    'Faridpur City', 'Alfadanga', 'Bhanga', 'Boalmari', 'Charbhadrasan', 'Madhukhali', 'Nagarkanda', 'Sadarpur', 'Saltha'
  ],
  'Gopalganj': [
    'Gopalganj City', 'Kashiani', 'Kotalipara', 'Muksudpur', 'Tungipara'
  ],
  'Madaripur': [
    'Madaripur City', 'Kalkini', 'Rajoir', 'Shibchar'
  ],
  'Shariatpur': [
    'Shariatpur City', 'Bhedarganj', 'Damudya', 'Gosairhat', 'Naria', 'Zajira'
  ],
  'Rajbari': [
    'Rajbari City', 'Baliakandi', 'Goalandaghat', 'Pangsha', 'Kalukhali'
  ],

  // Chittagong Division
  'Chittagong': [
    'Chittagong City', 'Hathazari', 'Raujan', 'Fatikchhari', 'Sandwip',
    'Sitakunda', 'Mirsharai', 'Patiya', 'Banshkhali', 'Boalkhali', 'Anwara',
    'Chandanaish', 'Satkania', 'Lohagara', 'Pahartali', 'Halishahar', 'Agrabad',
    'Kotwali', 'Double Mooring', 'Bakalia', 'Bayezid', 'Chandgaon', 'Nasirabad'
  ],
  'Cox\'s Bazar': [
    'Cox\'s Bazar', 'Teknaf', 'Ukhia', 'Ramu', 'Chakaria', 'Kutubdia', 'Maheshkhali', 'Pekua'
  ],
  'Comilla': [
    'Comilla City', 'Barura', 'Brahmanpara', 'Burichong', 'Chandina', 'Chauddagram',
    'Daudkandi', 'Debidwar', 'Homna', 'Laksam', 'Monohorgonj', 'Meghna', 'Muradnagar',
    'Nangalkot', 'Titas'
  ],
  'Feni': [
    'Feni City', 'Chhagalnaiya', 'Daganbhuiyan', 'Parshuram', 'Sonagazi', 'Fulgazi'
  ],
  'Noakhali': [
    'Noakhali City', 'Begumganj', 'Chatkhil', 'Companiganj', 'Hatiya', 'Kabirhat',
    'Senbagh', 'Sonaimuri', 'Subarnachar'
  ],
  'Brahmanbaria': [
    'Brahmanbaria City', 'Akhaura', 'Bancharampur', 'Bijoynagar', 'Kasba', 'Nabinagar', 'Nasirnagar', 'Sarail'
  ],
  'Chandpur': [
    'Chandpur City', 'Faridganj', 'Haimchar', 'Hajiganj', 'Kachua', 'Matlab Dakshin', 'Matlab Uttar', 'Shahrasti'
  ],
  'Lakshmipur': [
    'Lakshmipur City', 'Raipur', 'Ramganj', 'Ramgati', 'Kamalnagar'
  ],
  'Bandarban': [
    'Bandarban City', 'Alikadam', 'Thanchi', 'Ruma', 'Rowangchhari', 'Lama', 'Naikhongchhari'
  ],
  'Rangamati': [
    'Rangamati City', 'Bagaichhari', 'Barkal', 'Belaichhari', 'Juraichhari', 'Kaptai', 'Kawkhali', 'Langadu', 'Naniarchar', 'Rajsthali'
  ],
  'Khagrachhari': [
    'Khagrachhari City', 'Dighinala', 'Lakshmichhari', 'Mahalchhari', 'Manikchhari', 'Matiranga', 'Panchhari', 'Ramgarh'
  ],

  // Rajshahi Division
  'Rajshahi': [
    'Rajshahi City', 'Paba', 'Bagha', 'Bagmara', 'Charghat', 'Durgapur', 'Godagari', 'Mohanpur', 'Puthia', 'Tanore'
  ],
  'Bogra': [
    'Bogra City', 'Adamdighi', 'Dhunat', 'Dhupchanchia', 'Gabtali', 'Kahaloo', 'Nandigram', 'Sariakandi', 'Shajahanpur', 'Sherpur', 'Shibganj', 'Sonatala'
  ],
  'Pabna': [
    'Pabna City', 'Atgharia', 'Bera', 'Bhangura', 'Chatmohar', 'Faridpur', 'Ishwardi', 'Santhia', 'Sujanagar'
  ],
  'Sirajganj': [
    'Sirajganj City', 'Belkuchi', 'Chauhali', 'Kamarkhanda', 'Kazipur', 'Raiganj', 'Shahjadpur', 'Tarash', 'Ullahpara'
  ],
  'Natore': [
    'Natore City', 'Bagatipara', 'Baraigram', 'Gurudaspur', 'Lalpur', 'Singra'
  ],
  'Naogaon': [
    'Naogaon City', 'Atrai', 'Badalgachhi', 'Dhamoirhat', 'Manda', 'Mohadevpur', 'Niamatpur', 'Patnitala', 'Porsha', 'Raninagar', 'Sapahar'
  ],
  'Chapainawabganj': [
    'Chapainawabganj City', 'Bholahat', 'Gomastapur', 'Nachole', 'Shibganj'
  ],
  'Joypurhat': [
    'Joypurhat City', 'Akkelpur', 'Kalai', 'Khetlal', 'Panchbibi'
  ],
  'Kushtia': [
    'Kushtia City', 'Bheramara', 'Daulatpur', 'Khoksa', 'Kumarkhali', 'Mirpur'
  ],
  'Meherpur': [
    'Meherpur City', 'Gangni', 'Mujibnagar'
  ],
  'Chuadanga': [
    'Chuadanga City', 'Alamdanga', 'Damurhuda', 'Jibannagar'
  ],
  'Jhenaidah': [
    'Jhenaidah City', 'Harinakunda', 'Kaliganj', 'Kotchandpur', 'Maheshpur', 'Shailkupa'
  ],
  'Magura': [
    'Magura City', 'Mohammadpur', 'Shalikha', 'Sreepur'
  ],
  'Narail': [
    'Narail City', 'Kalia', 'Lohagara'
  ],

  // Khulna Division
  'Khulna': [
    'Khulna City', 'Batiaghata', 'Dacope', 'Dumuria', 'Dighalia', 'Dumuria', 'Fultala', 'Koyra', 'Paikgachha', 'Phultala', 'Rupsa', 'Terokhada'
  ],
  'Jessore': [
    'Jessore City', 'Abhaynagar', 'Bagherpara', 'Chaugachha', 'Jhikargachha', 'Keshabpur', 'Manirampur', 'Sharsha'
  ],
  'Satkhira': [
    'Satkhira City', 'Assasuni', 'Debhata', 'Kalaroa', 'Kaliganj', 'Patkelghata', 'Tala'
  ],
  'Bagerhat': [
    'Bagerhat City', 'Chitalmari', 'Fakirhat', 'Kachua', 'Mollahat', 'Mongla', 'Morrelganj', 'Rampal', 'Sarankhola'
  ],

  // Barisal Division
  'Barisal': [
    'Barisal City', 'Agailjhara', 'Babuganj', 'Bakerganj', 'Banaripara', 'Gaurnadi', 'Hizla', 'Mehendiganj', 'Muladi', 'Wazirpur'
  ],
  'Patuakhali': [
    'Patuakhali City', 'Bauphal', 'Dashmina', 'Dumki', 'Galachipa', 'Kalapara', 'Mirzaganj', 'Rangabali'
  ],
  'Bhola': [
    'Bhola City', 'Borhanuddin', 'Char Fasson', 'Daulatkhan', 'Lalmohan', 'Manpura', 'Tazumuddin'
  ],
  'Pirojpur': [
    'Pirojpur City', 'Bhandaria', 'Kaukhali', 'Mathbaria', 'Nazirpur', 'Nesarabad', 'Zianagar'
  ],
  'Jhalokati': [
    'Jhalokati City', 'Kathalia', 'Nalchity', 'Rajapur'
  ],
  'Barguna': [
    'Barguna City', 'Amtali', 'Bamna', 'Betagi', 'Patharghata', 'Taltali'
  ],

  // Sylhet Division
  'Sylhet': [
    'Sylhet City', 'Balaganj', 'Beanibazar', 'Bishwanath', 'Balaganj', 'Companigonj', 'Fenchuganj', 'Golapganj', 'Gowainghat', 'Jaintiapur', 'Kanaighat', 'Osmani Nagar', 'Zakiganj'
  ],
  'Moulvibazar': [
    'Moulvibazar City', 'Barlekha', 'Juri', 'Kamalganj', 'Kulaura', 'Rajnagar', 'Sreemangal'
  ],
  'Habiganj': [
    'Habiganj City', 'Ajmiriganj', 'Baniachong', 'Bahubal', 'Chunarughat', 'Lakhai', 'Madhabpur', 'Nabiganj', 'Shaistaganj'
  ],
  'Sunamganj': [
    'Sunamganj City', 'Bishwamvarpur', 'Chhatak', 'Derai', 'Dharampasha', 'Dowarabazar', 'Jagannathpur', 'Jamalganj', 'Sullah', 'Tahirpur'
  ],

  // Rangpur Division
  'Rangpur': [
    'Rangpur City', 'Badarganj', 'Gangachara', 'Kaunia', 'Mithapukur', 'Pirgacha', 'Pirganj', 'Taraganj'
  ],
  'Dinajpur': [
    'Dinajpur City', 'Birampur', 'Birganj', 'Biral', 'Bochaganj', 'Chirirbandar', 'Fulbari', 'Ghoraghat', 'Hakimpur', 'Kaharole', 'Khansama', 'Nawabganj', 'Parbatipur'
  ],
  'Gaibandha': [
    'Gaibandha City', 'Fulchhari', 'Gobindaganj', 'Palashbari', 'Sadullapur', 'Saghata', 'Sundarganj'
  ],
  'Kurigram': [
    'Kurigram City', 'Bhurungamari', 'Char Rajibpur', 'Chilmari', 'Phulbari', 'Nageshwari', 'Rajarhat', 'Raomari', 'Ulipur'
  ],
  'Lalmonirhat': [
    'Lalmonirhat City', 'Aditmari', 'Hatibandha', 'Kaliganj', 'Patgram'
  ],
  'Nilphamari': [
    'Nilphamari City', 'Dimla', 'Domar', 'Jaldhaka', 'Kishoreganj', 'Saidpur'
  ],
  'Panchagarh': [
    'Panchagarh City', 'Atwari', 'Boda', 'Debiganj', 'Tetulia'
  ],
  'Thakurgaon': [
    'Thakurgaon City', 'Baliadangi', 'Haripur', 'Pirganj', 'Ranisankail'
  ],

  // Mymensingh Division
  'Mymensingh': [
    'Mymensingh City', 'Bhaluka', 'Dhobaura', 'Fulbaria', 'Gaffargaon', 'Gauripur', 'Haluaghat', 'Ishwarganj', 'Muktagachha', 'Nandail', 'Phulpur', 'Tarakanda'
  ],
  'Jamalpur': [
    'Jamalpur City', 'Baksiganj', 'Dewanganj', 'Islampur', 'Madarganj', 'Melandaha', 'Sarishabari'
  ],
  'Netrokona': [
    'Netrokona City', 'Atpara', 'Barhatta', 'Durgapur', 'Khaliajuri', 'Kalmakanda', 'Kendua', 'Madan', 'Mohanganj', 'Purbadhala'
  ],
  'Sherpur': [
    'Sherpur City', 'Jhenaigati', 'Nakla', 'Nalitabari', 'Sreebardi'
  ],
}
