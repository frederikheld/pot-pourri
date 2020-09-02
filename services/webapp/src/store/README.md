# Vuex Cheatsheet

## Mutations vs. Actions

Although it is possible to write and read state variables in Vuex store directly, it is not recommended as it can have side effects. Instead Mutations and actions should be used to change the state in Vuex in a controlled way.

There are some differences between the two:

| operation | style | signature | call |
| - | - | - | - |
| mutation | sync | mutation_name (state, payload) { } | in component:<br/>this.$store.commit('mutation_name', payload)<br/>in action:<br/>context.commit('mutation_name', payload) |
| action | async | action_name (context, payload) { } | this.$store.dispatch('action_name', payload) |

**Mutations** do **sync** mutations of state.

**Actions** can be used to do **async** operations before commiting a mutation. The mutation is commited from within the action.