import { useState, useRef, useCallback } from 'react';
import * as LucideIcons from 'lucide-react';

export default function ChatInput({ sendMessage }) {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() || files.length > 0) {
      sendMessage(message, files);
      setMessage('');
      setFiles([]);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      if (isPaused) {
        mediaRecorderRef.current?.resume();
        setIsPaused(false);
      } else {
        mediaRecorderRef.current?.pause();
        setIsPaused(true);
      }
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorderRef.current = mediaRecorder;
          mediaRecorder.start();

          mediaRecorder.addEventListener('dataavailable', (event) => {
            audioChunksRef.current.push(event.data);
          });

          mediaRecorder.addEventListener('stop', () => {
            const audioBlob = new Blob(audioChunksRef.current, {
              type: 'audio/wav',
            });
            const audioFile = new File(
              [audioBlob],
              `recording_${Date.now()}.wav`,
              {
                type: 'audio/wav',
              }
            );
            setFiles((prevFiles) => [...prevFiles, audioFile]);
            audioChunksRef.current = [];
          });

          setIsRecording(true);
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
          alert(
            'Microphone access denied. Please allow microphone access to record audio.'
          );
        });
    }
  }, [isRecording, isPaused]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  }, []);

  return (
    <div className='group relative flex w-full items-center'>
      <div className='flex w-full flex-col gap-1.5 rounded-[26px] p-1.5 transition-colors bg-[#dcd8d8]'>
        {files.length > 0 && (
          <div className='mb-2 p-2 bg-gray-100 rounded-lg flex flex-wrap gap-2'>
            {files.map((file, index) => (
              <div key={index} className='relative'>
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt='Preview'
                    className='w-16 h-16 object-cover rounded'
                  />
                ) : file.type.startsWith('audio/') ? (
                  <audio
                    controls
                    src={URL.createObjectURL(file)}
                    className='w-32'
                  />
                ) : (
                  <div className='w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs'>
                    {file.name}
                  </div>
                )}
                <button
                  onClick={() => removeFile(index)}
                  className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                >
                  <LucideIcons.X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className='flex items-end gap-1.5 pl-4 md:gap-2'
        >
          <div className='-ml-2.5 flex'>
            <button
              type='button'
              className='flex items-center justify-center h-full w-full rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300'
              aria-label='Attach files'
              onClick={() => fileInputRef.current?.click()}
            >
              <LucideIcons.Paperclip size={20} />
            </button>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept='image/*,audio/*'
              multiple
              className='hidden'
            />
          </div>
          <div className='flex min-w-0 flex-1 flex-col'>
            <div className='max-h-52 overflow-auto'>
              <textarea
                className='block h-10 w-full resize-none border-0 bg-transparent px-0 py-2 text-gray-900 placeholder:text-gray-500 focus:ring-0 focus:outline-none'
                placeholder='Message ChattaTrader'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={1}
              />
            </div>
          </div>
          <div className='flex min-w-[72px] justify-end'>
            <button
              type='button'
              className={`mb-1 me-1 flex h-full w-full items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 ${
                isRecording ? 'bg-red-500 text-white animate-pulse' : ''
              }`}
              aria-label='Voice input'
              onClick={isRecording ? stopRecording : toggleRecording}
            >
              {isRecording ? (
                isPaused ? (
                  <LucideIcons.Play size={20} />
                ) : (
                  <LucideIcons.Pause size={20} />
                )
              ) : (
                <LucideIcons.Mic size={20} />
              )}
            </button>

            <button
              type='submit'
              disabled={!message.trim() && files.length === 0}
              className='mb-1 me-1 flex h-full w-full items-center justify-center rounded-full bg-[#0463CA] text-white transition-colors hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:bg-gray-300 disabled:text-gray-500'
              aria-label='Send message'
            >
              <LucideIcons.Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
