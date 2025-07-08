import React, { useState } from 'react';
import { FiGlobe } from 'react-icons/fi';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ja', name: 'Japanese' }
];

export default function LanguageSettings() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium flex items-center">
        <FiGlobe className="mr-2" /> Language Preferences
      </h3>
      <div className="mt-4 space-y-4">
        <p className="text-gray-700">Select your preferred language for the application:</p>
        <div className="space-y-2">
          {languages.map((language) => (
            <div key={language.code} className="flex items-center">
              <input
                type="radio"
                id={`lang-${language.code}`}
                name="language"
                value={language.code}
                checked={selectedLanguage === language.code}
                onChange={() => setSelectedLanguage(language.code)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
              />
              <label htmlFor={`lang-${language.code}`} className="ml-3 block text-gray-700">
                {language.name}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}