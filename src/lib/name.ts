export function getRandomName() {
  const adjectives = [
    'Swift',
    'Clever',
    'Brave',
    'Mighty',
    'Fierce',
    'Gentle',
    'Wise',
    'Nimble',
    'Bold',
    'Loyal',
  ]
  const animals = [
    'Lion',
    'Tiger',
    'Eagle',
    'Shark',
    'Wolf',
    'Falcon',
    'Panther',
    'Bear',
    'Fox',
    'Hawk',
  ]
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const animal = animals[Math.floor(Math.random() * animals.length)]
  return `${adjective} ${animal}`
}
