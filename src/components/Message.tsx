interface IMessage {
  author: string;
  message: string;
  mine: boolean;
}

function Message({ author, message, mine }: IMessage) {
  return (
    <div
      className={`w-full flex items-center justify-start font-space-regular text-xs border-b border-primaryMy my-[3px] pb-[3px]`}
    >
      <p
        className={`font-space-medium w-20 max-w-20 min-w-20 truncate pl-2 ${mine ? 'text-primaryMy' : ''}`}
      >
        {author}
      </p>
      <p className='pr-2'>{message}</p>
    </div>
  );
}

export default Message;
