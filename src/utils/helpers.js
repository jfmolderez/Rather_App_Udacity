export function formatQuestion(question, author) {
    const { id, optionOne, optionTwo } = question
    const { name, avatarURL } = author
    
    return {
      id,
      name,
      avatar: avatarURL,
      optionOne,
      optionTwo
    }
  }
  