
import Image from "next/image"



interface GenerationProcessModalProps {
  number: number;
  title: string;
  subTitle: string;
}

const GenerationProcessModal: React.FC<GenerationProcessModalProps> = ({ number, title, subTitle }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    // onClick={closeModal}
    >
      <div
        className="w-full mx-3 p-2 rounded-2xl bg-main-background"
        style={{ maxWidth: 343 }}
      
      >
        <div
          className="flex flex-col w-full p-2 rounded-2xl items-center justify-center"
          style={{ height: 312, border: '2px dashed white' }}
        >
          <div className="rounded-full" style={{ position: 'relative', width: 96, height: 96, boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <Image
              src='/images/generate/processModalCircle.svg'
              alt='plus'
              width={96}
              height={96}
            />

            <div
              className="w-full h-full text-bold bg-white rounded-full flex items-center justify-center"
              style={{
                width: 80,
                height: 80,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: 25,
                color: 'var(--main-color)',

              }}
            >
              <div></div>
              {number}%
            </div>
          </div>

          <div
            className="text-semiBold text-white mt-4"
            style={{ fontSize: 32, color: '#FCFDFE' }}
          >
            {title}
          </div>

          <div
            className="text-medium text-white"
            style={{ fontSize: 13, color: '#FCFDFE' }}
          >
            {subTitle}
          </div>

        </div>




      </div>

    </div>
  );
}

export default GenerationProcessModal;
