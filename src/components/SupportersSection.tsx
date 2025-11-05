import nvidiaImage from '@/assets/Nvidia Inception program.png';
import microsoftImage from '@/assets/Microsoft.png';
import googleCloudImage from '@/assets/Goolge Cloud (1).png';
import mongodbImage from '@/assets/mongo-db.jpg';
import iimvImage from '@/assets/IIMV.png';
import deeptechImage from '@/assets/deeptech naipunya.png';

export const SupportersSection = () => {
  const supporters = [
    { name: 'NVIDIA Inception Program', image: nvidiaImage },
    { name: 'Microsoft', image: microsoftImage },
    { name: 'Google Cloud', image: googleCloudImage },
    { name: 'MongoDB', image: mongodbImage },
    { name: 'IIMV', image: iimvImage },
    { name: 'DeepTech Nalpunya', image: deeptechImage },
  ];

  return (
    <section className="py-24 px-4 space-gradient space-particles relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold gradient-text">
            Supported by
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-6 md:gap-8 items-center justify-items-center max-w-5xl mx-auto">
          {supporters.map((supporter, index) => {
            const whiteBackgroundLogos = [
              'NVIDIA Inception Program',
              'Microsoft',
              'Google Cloud',
              'MongoDB',
              'IIMV',
              'DeepTech Nalpunya'
            ];
            const needsWhiteBackground = whiteBackgroundLogos.includes(supporter.name);
            
            return (
              <div
                key={index}
                className={`flex items-center justify-center w-full h-24 md:h-32 p-4 rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover-scale ${
                  needsWhiteBackground ? 'bg-white' : 'card-gradient'
                }`}
              >
                <img
                  src={supporter.image}
                  alt={supporter.name}
                  className={`object-contain opacity-100 transition-opacity duration-300 ${
                    supporter.name === 'Microsoft' || supporter.name === 'Google Cloud' 
                      ? 'w-[90%] h-[90%]' 
                      : 'max-w-full max-h-full'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};