import React from 'react';
import { FaMosque, FaMoneyBillWave, FaMoon, FaTachometerAlt, FaBook } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';
import { MdOutlineCollectionsBookmark } from 'react-icons/md';

const GuidePage = () => {
  const guideSections = [
    {
      title: 'ড্যাশবোর্ড (Dashboard)',
      icon: <FaTachometerAlt className="text-3xl text-emerald-500" />,
      description: 'ড্যাশবোর্ডে আপনি মসজিদের সার্বিক আয়, ব্যয় এবং অন্যান্য গুরুত্বপূর্ণ তথ্যের সারসংক্ষেপ এক নজরে দেখতে পাবেন।',
      features: [
        'সারসংক্ষেপ: সর্বমোট আয়, ব্যয় এবং বর্তমান ব্যালেন্সের হিসাব দেখা যায়।',
        'সাম্প্রতিক লেনদেন: সর্বশেষ যুক্ত করা অনুদান বা খরচের তালিকা ড্যাশবোর্ডে সংক্ষেপে দেখা যায়।'
      ]
    },
    {
      title: 'অনুদান (Donations)',
      icon: <MdOutlineCollectionsBookmark className="text-3xl text-amber-500" />,
      description: 'এই সেকশন থেকে মসজিদের বিভিন্ন অনুদান ও আয়ের হিসাব রাখা হয়।',
      features: [
        'Friday Donations: জুম্মার নামাজের কালেকশনের তালিকা এখানে দেখা যাবে। নতুন কালেকশন যুক্ত করতে ড্যাশবোর্ডের "Create Donation" পেজে যান, সেখানে ক্যাটাগরি হিসেবে জুম্মা কালেকশন সিলেক্ট করুন, তারিখ ও টাকার পরিমাণ দিয়ে "Submit" করুন। এরপর তা এই লিস্টে চলে আসবে।',
        'Create Donation: যেকোনো নতুন অনুদান সিস্টেমে এন্ট্রি করার জন্য এই অপশনটি ব্যবহার করুন। অনুদানের ধরন, পরিমাণ এবং অন্যান্য তথ্য দিয়ে ফর্মটি পূরণ করে সেভ করুন।',
        'All Donations: জুম্মা, সাধারণ দান বা অন্যান্য সব ধরনের অনুদানের সম্মিলিত তালিকা এবং বিস্তারিত রিপোর্ট এখান থেকে দেখতে পারবেন।'
      ]
    },
    {
      title: 'রমজান (Ramadan)',
      icon: <FaMoon className="text-3xl text-indigo-500" />,
      description: 'পবিত্র রমজান মাসের বিভিন্ন কার্যক্রম এবং আয়-ব্যয়ের হিসাব এখানে সংরক্ষণ করা হয়।',
      features: [
        'Create Ramadan: নতুন রমজান মাসের জন্য সেটআপ তৈরি করতে এখানে বছর এবং ফান্ডের নাম দিয়ে সেভ করুন।',
        'Iftar: ইফতার ফান্ডে টাকা যুক্ত করতে ফর্মে দাতার নাম, টাকার পরিমাণ ও তারিখ দিয়ে সাবমিট করুন। সকল ইফতারের কালেকশন বা খরচের হিসাব এখানে জমা হবে।',
        'Itikaf: ইতিকাফকারীদের তথ্য (নাম, মোবাইল নাম্বার) এবং তাদের থেকে প্রাপ্ত ফি বা সংশ্লিষ্ট খরচের বিবরণ এখানে যুক্ত করতে পারবেন।',
        'Tarabi Payment: তারাবীহ পড়ানো হাফেজদের পেমেন্ট বা হাদিয়া দেওয়ার জন্য এই অপশনে গিয়ে নাম, পরিমাণ এবং পেমেন্ট মেথড সিলেক্ট করে সেভ করুন।'
      ]
    },
    {
      title: 'মাসিক চাঁদা (Monthly Collection)',
      icon: <FaMoneyBillWave className="text-3xl text-green-500" />,
      description: 'মসজিদের সদস্যদের মাসিক চাঁদা বা অনুদান সংগ্রহের জন্য এই সেকশন ব্যবহার করা হয়।',
      features: [
        'Add Members: নতুন সদস্য যুক্ত করতে এই পেজে গিয়ে সদস্যের নাম, মোবাইল নাম্বার এবং ঠিকানা দিয়ে ফর্মটি সাবমিট করুন।',
        'Members Payment: সদস্যদের থেকে মাসিক চাঁদা গ্রহণ করতে, প্রথমে সদস্যের নাম নির্বাচন করুন, এরপর কোন মাসের চাঁদা দিচ্ছে তা সিলেক্ট করে টাকার পরিমাণ দিয়ে পেমেন্ট সাবমিট করুন।',
        'All Payment: কে কোন মাসের চাঁদা দিয়েছে এবং কবে দিয়েছে, তার পুরো ট্রানজেকশন হিস্ট্রি বা ইতিহাস এখানে দেখা যাবে।'
      ]
    },
    {
      title: 'পরিচালনা ব্যয় (Management Cost)',
      icon: <FaCartShopping className="text-3xl text-red-500" />,
      description: 'মসজিদের দৈনন্দিন খরচ, স্টাফদের বেতন এবং অন্যান্য ক্রয়ের হিসাব রাখার জায়গা।',
      features: [
        'Create Staff: মসজিদের নতুন স্টাফ (ইমাম, মুয়াজ্জিন, খাদেম ইত্যাদি) যুক্ত করতে তাদের নাম, পদবি এবং মাসিক বেতনের পরিমাণ দিয়ে সেভ করুন।',
        'Staff Payment: স্টাফদের মাসিক বেতন দিতে এই অপশনে যান, লিস্ট থেকে স্টাফের নাম নির্বাচন করে বেতনের পরিমাণ ও মাস সিলেক্ট করে পেমেন্ট সাবমিট করুন।',
        'Purchases Accessory: মসজিদের যেকোনো কেনাকাটার (যেমন: কার্পেট, লাইট, ক্লিনিং সামগ্রী) ভাউচার বা রশিদ অনুযায়ী টাকার পরিমাণ এবং বিবরণ দিয়ে খরচ হিসেবে এন্ট্রি করুন।'
      ]
    },
    {
      title: 'মসজিদ ব্যবস্থাপনা (Mosques Management)',
      icon: <FaMosque className="text-3xl text-teal-500" />,
      description: 'মূল মসজিদের তথ্য এবং পেমেন্ট সংক্রান্ত সাধারণ সেটিংস এখান থেকে পরিচালনা করা যায়।',
      features: [
        'Create Mosques: আপনার মসজিদের নাম, ঠিকানা এবং অন্যান্য সাধারণ প্রোফাইল তথ্য এখানে যুক্ত করে সেভ করতে পারবেন।',
        'Payment Credentials: পেমেন্ট গেটওয়ের (যেমন: বিকাশ, নগদ, রকেট বা ব্যাংক অ্যাকাউন্ট) নাম্বার যুক্ত করুন, যাতে ডোনাররা এই তথ্য দেখে সহজে টাকা পাঠাতে পারে।'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-8">
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 sm:p-10 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <FaBook className="text-3xl" />
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">সিস্টেম ব্যবহারের নির্দেশিকা</h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          মসজিদ ম্যানেজমেন্ট সিস্টেমটি ব্যবহার করার জন্য নিচের নির্দেশিকাগুলো ভালোভাবে পড়ুন। এখানে প্রতিটি মেনু থেকে কীভাবে ডেটা এন্ট্রি করতে হবে এবং কোথায় সেই ডেটা দেখা যাবে তার বিস্তারিত গাইডলাইন দেওয়া আছে।
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {guideSections.map((section, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col group transform hover:-translate-y-1">
            <div className="p-6 border-b border-gray-50 flex items-center gap-4 bg-gray-50/50 group-hover:bg-emerald-50/50 transition-colors">
              <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                {section.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
            </div>
            <div className="p-6 flex-1 flex flex-col bg-white">
              <p className="text-gray-600 mb-6 font-medium text-sm sm:text-base leading-relaxed">
                {section.description}
              </p>
              <div className="mt-auto space-y-4">
                <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">কীভাবে ব্যবহার করবেন:</h3>
                <ul className="space-y-4">
                  {section.features.map((feature, idx) => {
                    const splitIndex = feature.indexOf(':');
                    let boldPart = feature;
                    let restPart = '';
                    
                    if (splitIndex !== -1) {
                      boldPart = feature.substring(0, splitIndex);
                      restPart = feature.substring(splitIndex + 1);
                    }

                    return (
                      <li key={idx} className="flex items-start text-sm text-gray-600 bg-gray-50/50 p-3 rounded-lg border border-gray-50">
                        <span className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0 text-lg">•</span>
                        <span className="leading-relaxed">
                          {splitIndex !== -1 ? (
                            <>
                              <strong className="text-emerald-800 font-semibold text-sm">{boldPart}:</strong>
                              <span className="ml-1">{restPart}</span>
                            </>
                          ) : (
                            feature
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 sm:p-8 text-center border border-emerald-100 shadow-sm">
        <h3 className="text-xl font-bold text-emerald-800 mb-2">সাহায্য প্রয়োজন?</h3>
        <p className="text-emerald-600 font-medium">যেকোনো টেকনিক্যাল সমস্যার জন্য অ্যাডমিনিস্ট্রেটরের সাথে যোগাযোগ করুন।</p>
      </div>
    </div>
  );
};

export default GuidePage;
